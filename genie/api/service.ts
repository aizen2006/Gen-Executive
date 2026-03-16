import { genieAgent } from "../agent/agent.ts";
import { run } from "@openai/agents";
import "dotenv/config";
export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const sessionHistory = new Map<string, ChatMessage[]>();

function getSessionHistory(sessionId: string): ChatMessage[] {
  if (!sessionHistory.has(sessionId)) {
    sessionHistory.set(sessionId, []);
  }
  return sessionHistory.get(sessionId)!;
}

export async function chatWithGenie(
  sessionId: string,
  userMessage: string
): Promise<string> {
  const history = getSessionHistory(sessionId);

  history.push({ role: "user", content: userMessage });

  const prompt = history
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const result = await run(genieAgent, prompt);

  const assistantMessage = String(result.finalOutput ?? "").trim();

  history.push({ role: "assistant", content: assistantMessage });

  return assistantMessage;
}

