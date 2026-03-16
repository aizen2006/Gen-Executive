import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { registerChatSocket } from "./socket.ts";

export function createApp() {
  const app = express();

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  return app;
}

export function startServer(port: number = Number(process.env.PORT) || 4000) {
  const app = createApp();
  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CHAT_WIDGET_ORIGIN || "*",
      methods: ["GET", "POST"],
    },
  });

  registerChatSocket(io);

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Genie chat server listening on port ${port}`);
  });

  return { app, httpServer, io };
}

