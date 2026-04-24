import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { streamGenieMessage } from "../lib/genieClient";

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
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const assistantMessageId = `${Date.now()}-${Math.random()}-assistant`;

    setMessages((prev) => {
      const next = [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}-user`,
          from: "user" as const,
          text: trimmed,
        },
        {
          id: assistantMessageId,
          from: "agent" as const,
          text: "",
        },
      ];

      return next;
    });
    setInput("");
    setError(null);
    setIsTyping(true);
    setIsStreaming(true);
    if (!isOpen) setIsOpen(true);

    try {
      await streamGenieMessage(trimmed, {
        onStatus: (payload) => {
          setIsTyping(payload.phase !== "done");
        },
        onChunk: (payload) => {
          if (!payload.text) return;

          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? { ...message, text: `${message.text}${payload.text}` }
                : message,
            ),
          );
        },
        onError: (payload) => {
          setError(payload.message);
          setIsTyping(false);
        },
        onDone: () => {
          setIsTyping(false);
        },
      });
    } catch (streamError) {
      setError(streamError instanceof Error ? streamError.message : "Genie chat failed to start.");
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId && !message.text
            ? {
                ...message,
                text: "Genie is unavailable right now.",
              }
            : message,
        ),
      );
      setIsTyping(false);
    } finally {
      setIsStreaming(false);
    }
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
                  disabled={!input.trim() || isStreaming}
                  className="inline-flex h-8 px-3 items-center justify-center rounded-full bg-brand-cyan text-[11px] font-semibold text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,230,255,0.6)]"
                >
                  {isStreaming ? "Streaming..." : "Send"}
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
