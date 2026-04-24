import "dotenv/config";
import express, { type Request, type Response } from "express";
import { streamGenieReply } from "../genie/agent.js";

const app = express();
const port = Number(process.env.PORT || 8787);
const allowedOrigin = process.env.CORS_ORIGIN?.trim() || "*";

app.use(express.json({ limit: "1mb" }));

app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", allowedOrigin);
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (allowedOrigin !== "*") {
    response.header("Vary", "Origin");
  }

  next();
});

app.options("*", (_, response) => {
  response.sendStatus(204);
});

app.get("/health", (_request, response) => {
  response.status(200).json({ ok: true });
});

app.post("/chat", async (request: Request, response: Response) => {
  const message = typeof request.body?.message === "string" ? request.body.message.trim() : "";

  if (!message) {
    response.status(400).json({ message: "Message is required." });
    return;
  }

  response.writeHead(200, {
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream; charset=utf-8",
    "X-Accel-Buffering": "no",
  });

  const writeEvent = (eventName: string, payload: unknown) => {
    response.write(`event: ${eventName}\n`);
    response.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  writeEvent("status", { phase: "starting" });

  try {
    await streamGenieReply({ message }, (event) => {
      writeEvent(event.type, event.payload ?? {});
    });
  } catch (error) {
    writeEvent("error", {
      message: error instanceof Error ? error.message : "Genie chat failed.",
    });
    writeEvent("done", {});
  } finally {
    response.end();
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`GenExecutive API listening on http://0.0.0.0:${port}`);
});

