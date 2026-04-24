import { createReadStream, existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { streamGenieReply } from "../api/genie/agent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 8787);

const staticContentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

const readJsonBody = async (request: IncomingMessage) => {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

const sendJson = (response: ServerResponse, statusCode: number, payload: unknown) => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
};

const writeSseEvent = (response: ServerResponse, eventName: string, payload: unknown) => {
  response.write(`event: ${eventName}\n`);
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
};

const tryServeStaticAsset = async (requestPath: string, response: ServerResponse) => {
  if (!existsSync(distDir)) {
    return false;
  }

  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const assetPath = path.normalize(path.join(distDir, normalizedPath));

  if (!assetPath.startsWith(distDir)) {
    sendJson(response, 403, { message: "Forbidden" });
    return true;
  }

  try {
    const assetStat = await stat(assetPath);
    if (!assetStat.isFile()) {
      return false;
    }

    const extension = path.extname(assetPath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": staticContentTypes[extension] || "application/octet-stream",
    });
    createReadStream(assetPath).pipe(response);
    return true;
  } catch {
    return false;
  }
};

const serveIndexHtml = async (response: ServerResponse) => {
  const indexPath = path.join(distDir, "index.html");
  const html = await readFile(indexPath, "utf8");

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(html);
};

const server = createServer(async (request, response) => {
  const method = request.method || "GET";
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
    });
    response.end();
    return;
  }

  if (method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (method === "POST" && url.pathname === "/api/genie/chat") {
    try {
      const body = (await readJsonBody(request)) as { message?: unknown };
      const message = typeof body.message === "string" ? body.message.trim() : "";

      if (!message) {
        sendJson(response, 400, { message: "Message is required." });
        return;
      }

      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream; charset=utf-8",
        "X-Accel-Buffering": "no",
      });

      writeSseEvent(response, "status", { phase: "starting" });

      await streamGenieReply({ message }, (event) => {
        writeSseEvent(response, event.type, event.payload ?? {});
      });

      response.end();
      return;
    } catch (error) {
      if (!response.headersSent) {
        sendJson(response, 500, {
          message: error instanceof Error ? error.message : "Genie server failed.",
        });
        return;
      }

      writeSseEvent(response, "error", {
        message: error instanceof Error ? error.message : "Genie server failed.",
      });
      writeSseEvent(response, "done", {});
      response.end();
      return;
    }
  }

  if (method === "GET") {
    const servedAsset = await tryServeStaticAsset(url.pathname, response);
    if (servedAsset) {
      return;
    }

    if (existsSync(distDir)) {
      await serveIndexHtml(response);
      return;
    }
  }

  sendJson(response, 404, { message: "Not found" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Genie server listening on http://0.0.0.0:${port}`);
});
