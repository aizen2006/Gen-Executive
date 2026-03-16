import { io, Socket } from "socket.io-client";

export type ChatSender = "user" | "agent";

export interface GenieChatMessage {
  from: ChatSender;
  message: string;
  sessionId: string;
}

export interface GenieTypingEvent {
  sessionId: string;
  typing: boolean;
}

export interface GenieErrorEvent {
  sessionId: string;
  message: string;
}

const GENIE_URL =
  (typeof window !== "undefined" && (import.meta as any).env?.VITE_GENIE_SOCKET_URL) ||
  process.env.VITE_GENIE_SOCKET_URL ||
  "http://localhost:4000";

let socket: Socket | null = null;
let sessionId: string | null = null;

function getSessionId() {
  if (sessionId) return sessionId;
  const existing =
    (typeof window !== "undefined" && window.localStorage.getItem("genie_session_id")) ||
    null;
  if (existing) {
    sessionId = existing;
    return sessionId;
  }
  const generated = crypto.randomUUID();
  sessionId = generated;
  if (typeof window !== "undefined") {
    window.localStorage.setItem("genie_session_id", generated);
  }
  return generated;
}

export function getGenieSocket() {
  if (socket) return socket;
  const s = io(GENIE_URL, { transports: ["websocket"] });
  const id = getSessionId();
  s.on("connect", () => {
    s.emit("chat:join", { sessionId: id });
  });
  socket = s;
  return socket;
}

export function sendGenieMessage(message: string) {
  const s = getGenieSocket();
  const id = getSessionId();
  s.emit("chat:message", { sessionId: id, message });
}

