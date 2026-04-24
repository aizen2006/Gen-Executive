import { query } from "@anthropic-ai/claude-agent-sdk";
import { caldotcomServer } from "./tools/tools.js";

export interface GenieAgentInput {
  message: string;
}

export interface GenieAgentEvent {
  type: "status" | "chunk" | "error" | "done";
  payload?: Record<string, unknown>;
}

const systemPrompt = `
You are Genie, the GenExecutive assistant.

Your job is to help visitors understand GenExecutive's services and move qualified prospects toward booking a meeting.

Context about GenExecutive:
- We build MVPs, AI agents, workflow automations, chat systems, and executive/admin support systems.
- You should be concise, commercially useful, and concrete.
- When appropriate, guide the user toward booking a call.
- If the user wants scheduling help, use the Cal.com tools that are available to you.

Behavior rules:
- Answer the user's question directly before pitching.
- Do not invent pricing, timelines, or capabilities that were not provided.
- If you do not know a detail, say so briefly and offer the closest next step.
`.trim();

const createPrompt = ({ message }: GenieAgentInput) => `
User message:
${message}

Respond as Genie for the GenExecutive website chat widget.
`.trim();

const extractText = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  if ("result" in value && typeof value.result === "string") {
    return value.result;
  }

  if ("message" in value) {
    return extractText(value.message);
  }

  if ("content" in value && Array.isArray(value.content)) {
    const textParts = value.content
      .map((item) => {
        if (item && typeof item === "object" && "text" in item && typeof item.text === "string") {
          return item.text;
        }

        return "";
      })
      .filter(Boolean);

    return textParts.join("");
  }

  if ("text" in value && typeof value.text === "string") {
    return value.text;
  }

  return "";
};

export const streamGenieReply = async (
  input: GenieAgentInput,
  emit: (event: GenieAgentEvent) => void,
) => {
  emit({
    type: "status",
    payload: { phase: "starting" },
  });

  let emittedChunk = false;

  try {
    for await (const message of query({
      prompt: createPrompt(input),
      options: {
        mcpServers: { CalDotCom: caldotcomServer },
        systemPrompt,
        settingSources: ["project"],
        maxTurns: 20,
        effort: "medium",
      },
    })) {
      const text = extractText(message);

      if (text) {
        emittedChunk = true;
        emit({
          type: "status",
          payload: { phase: "streaming" },
        });
        emit({
          type: "chunk",
          payload: { text },
        });
      }

      if (
        message &&
        typeof message === "object" &&
        "type" in message &&
        message.type === "result"
      ) {
        const subtype =
          "subtype" in message && typeof message.subtype === "string"
            ? message.subtype
            : "unknown";

        if (subtype !== "success" && !emittedChunk) {
          emit({
            type: "error",
            payload: { message: `Genie stopped with status: ${subtype}` },
          });
        }
      }
    }

    emit({
      type: "status",
      payload: { phase: "done" },
    });
    emit({ type: "done" });
  } catch (error) {
    emit({
      type: "error",
      payload: {
        message: error instanceof Error ? error.message : "Genie chat failed.",
      },
    });
    emit({
      type: "status",
      payload: { phase: "done" },
    });
    emit({ type: "done" });
  }
};
