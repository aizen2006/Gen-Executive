import { query } from "@anthropic-ai/claude-agent-sdk";
import "dotenv/config";
import { caldotcomServer } from "./tools/tools";
let sessionId: string | undefined;

const customPrompt = `
You are a Expert AI assistant and its you role to conince the user to book a meeting with us ,
Context: We are Genexecutive a modern agency providing solutions like developing MVP's and  AI agents , automations and admin & executive support ,
use the tools provided to Check our availibility , create and reschedule meeting .
`;

// Agentic loop: streams messages as Claude works
for await (const message of query({
  prompt: "Review utils.py for bugs that would cause crashes. Fix any issues you find.",
  options: {
    mcpServers: { CalDotCom: caldotcomServer },
    systemPrompt: customPrompt,
    allowedTools: ["WebSearch", "AskUserQuestion"], 
    settingSources: ["project"],
    maxTurns: 30,
    effort: "medium"
  }
})) {
    // Save the session ID to resume later if needed
    if (message.type === "system" && message.subtype === "init") {
      sessionId = message.session_id;
    }
  
    // Handle the final result
    if (message.type === "result") {
      if (message.subtype === "success") {
        console.log(`Done: ${message.result}`);
      } else if (message.subtype === "error_max_turns") {
        // Agent ran out of turns. Resume with a higher limit.
        console.log(`Hit turn limit. Resume session ${sessionId} to continue.`);
      } else {
        console.log(`Stopped: ${message.subtype}`);
      }
    }
  }