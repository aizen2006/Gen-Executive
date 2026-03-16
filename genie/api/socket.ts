import type { Server, Socket } from "socket.io";
import { chatWithGenie } from "./service.ts";
import type { ChatJoinPayload, ChatMessagePayload } from "./model.ts";

export function registerChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("chat:join", (payload: ChatJoinPayload) => {
      const { sessionId } = payload;
      if (!sessionId) return;
      socket.join(sessionId);
    });

    socket.on("chat:message", async (payload: ChatMessagePayload) => {
      const { sessionId, message } = payload;
      if (!sessionId || !message) return;

      try {
        io.to(sessionId).emit("chat:typing", { sessionId, typing: true });
        const reply = await chatWithGenie(sessionId, message);
        io.to(sessionId).emit("chat:message", {
          from: "agent",
          message: reply,
          sessionId,
        });
      } catch (error: any) {
        io.to(sessionId).emit("chat:error", {
          sessionId,
          message:
            error?.message ||
            "Something went wrong while talking to the Genie agent.",
        });
      } finally {
        io.to(sessionId).emit("chat:typing", { sessionId, typing: false });
      }
    });
  });
}

