import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { getGenieSocket, sendGenieMessage, GenieChatMessage, GenieTypingEvent, GenieErrorEvent } from "../lib/genieSocket";

interface ChatMessage {
  id: string;
  from: "user" | "agent";
  text: string;
}

interface ChatWidgetProps {
  initialOpen?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socket = useMemo(() => (typeof window !== "undefined" ? getGenieSocket() : null), []);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (payload: GenieChatMessage) => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          from: payload.from,
          text: payload.message,
        },
      ]);
    };

    const handleTyping = (payload: GenieTypingEvent) => {
      setIsTyping(payload.typing);
    };

    const handleError = (payload: GenieErrorEvent) => {
      setError(payload.message);
    };

    socket.on("chat:message", handleMessage);
    socket.on("chat:typing", handleTyping);
    socket.on("chat:error", handleError);

    return () => {
      socket.off("chat:message", handleMessage);
      socket.off("chat:typing", handleTyping);
      socket.off("chat:error", handleError);
    };
  }, [socket]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        from: "user",
        text: trimmed,
      },
    ]);
    setInput("");
    setError(null);
    sendGenieMessage(trimmed);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close Genie chat" : "Open Genie chat"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-cyan text-brand-dark shadow-[0_0_35px_rgba(34,230,255,0.7)] hover:shadow-[0_0_50px_rgba(34,230,255,0.9)] transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-cyan/80"
      >
        <MessageCircle size={26} />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-4 z-40 w-[320px] max-h-[70vh] rounded-2xl border border-brand-border/80 bg-brand-dark/95 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-lg flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border/70 bg-brand-dark/90">
              <div>
                <p className="text-sm font-semibold text-brand-light">Genie assistant</p>
                <p className="text-[11px] text-brand-muted">
                  Ask about automations, agents, and working with GenExecutive.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-surface/70 text-brand-muted hover:text-brand-light hover:bg-brand-surface transition"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 text-sm">
              {messages.length === 0 && (
                <p className="text-[12px] text-brand-muted/80">
                  Start a conversation and Genie will help you explore what we can build or automate together.
                </p>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      m.from === "user"
                        ? "bg-brand-cyan text-brand-dark rounded-br-sm"
                        : "bg-brand-surface/80 text-brand-light border border-brand-border/70 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-1 rounded-2xl bg-brand-surface/70 px-3 py-2 text-[11px] text-brand-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-muted animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-muted animate-bounce [animation-delay:80ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-muted animate-bounce [animation-delay:160ms]" />
                  </div>
                </div>
              )}
              {error && (
                <p className="text-[11px] text-red-400 mt-1">
                  {error}
                </p>
              )}
            </div>

            <div className="border-t border-brand-border/70 bg-brand-dark/90 px-3 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Genie anything..."
                  className="flex-1 rounded-full border border-brand-border bg-brand-surface/70 px-3 py-1.5 text-xs text-brand-light placeholder:text-brand-muted/70 focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="inline-flex h-8 px-3 items-center justify-center rounded-full bg-brand-cyan text-[11px] font-semibold text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,230,255,0.6)]"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

