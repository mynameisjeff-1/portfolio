import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const API_URL = import.meta.env.VITE_RAG_API_URL || "http://localhost:8787";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "Does he have production LLM experience?",
  "Walk me through the multi-agent platform",
  "Is he open to relocation?",
  "What makes his research interesting?",
  "Why should I interview him?",
];

const INITIAL_MESSAGE: Message =
  {
    role: "assistant",
    text: "I'm Hamza's CV, with opinions. Ask me anything about his work — I'll keep it accurate, and I'll admit when something isn't on the record.",
  };

const MIN_INTERVAL_MS = 2000;
const ERROR_MESSAGE =
  "My backend is having a moment. Email me directly and you'll get a faster answer anyway.";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const abortRef = useRef<{ cancelled: boolean } | null>(null);
  const lastSentRef = useRef(0);
  const logRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const now = Date.now();
      if (now - lastSentRef.current < MIN_INTERVAL_MS) {
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 1200);
        return;
      }
      lastSentRef.current = now;

      setMessages((m) => [...m, { role: "user", text: trimmed }, { role: "assistant", text: "" }]);
      setInput("");
      setStreaming(true);

      const controller = { cancelled: false };
      abortRef.current = controller;
      const fetchController = new AbortController();
      abortControllerRef.current = fetchController;

      try {
        // Recent turns only (excluding the placeholder assistant message just
        // pushed above) so the backend can resolve follow-ups like "tell me
        // more about it" without carrying the whole conversation every time.
        const history = messages.slice(-8).map((m) => ({ role: m.role, text: m.text }));

        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed, history }),
          signal: fetchController.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error("Request failed");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let gotError = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done || controller.cancelled) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload);
              if (parsed.error) {
                gotError = true;
                continue;
              }
              if (parsed.text) {
                setMessages((m) => {
                  const next = [...m];
                  next[next.length - 1] = {
                    role: "assistant",
                    text: next[next.length - 1].text + parsed.text,
                  };
                  return next;
                });
              }
            } catch {
              // ignore malformed SSE line
            }
          }
        }

        if (gotError) {
          setMessages((m) => {
            const next = [...m];
            if (!next[next.length - 1].text) {
              next[next.length - 1] = { role: "assistant", text: ERROR_MESSAGE };
            }
            return next;
          });
        }
      } catch {
        if (!controller.cancelled) {
          setMessages((m) => {
            const next = [...m];
            next[next.length - 1] = { role: "assistant", text: ERROR_MESSAGE };
            return next;
          });
        }
      } finally {
        setStreaming(false);
      }
    },
    [streaming, messages]
  );

  const handleStop = () => {
    if (abortRef.current) abortRef.current.cancelled = true;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setStreaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      const maxHeight = 4 * 24 + 24;
      el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    }
  };

  return (
    <section id="chat" className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal>
        <p className="font-mono-label mb-4" style={{ color: "var(--accent)" }}>
          02 — CHAT
        </p>
        <h2
          className="font-serif-display mb-10"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Interview me before you interview me.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div
          className="border w-full"
          style={{ backgroundColor: "var(--band)", borderColor: "var(--rule)", minHeight: "520px" }}
        >
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with Hamza's CV assistant"
            className="px-5 md:px-8 py-8 overflow-y-auto flex flex-col gap-6"
            style={{ minHeight: "420px", maxHeight: "560px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={m.role === "user" ? "max-w-[80%] px-4 py-3" : "max-w-[85%]"}
                  style={
                    m.role === "user"
                      ? { backgroundColor: "var(--ink)", color: "var(--paper)" }
                      : { color: "var(--ink)" }
                  }
                >
                  <p style={{ fontSize: "15.5px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                    {m.text}
                    {streaming && i === messages.length - 1 && m.role === "assistant" && (
                      <span className="caret-blink" aria-hidden="true" />
                    )}
                  </p>
                </div>
              </div>
            ))}

            {streaming && messages[messages.length - 1]?.text === "" && (
              <div className="flex justify-start gap-1.5 px-1" aria-hidden="true">
                <span className="dot-pulse w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--ink-secondary)", animationDelay: "0ms" }} />
                <span className="dot-pulse w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--ink-secondary)", animationDelay: "200ms" }} />
                <span className="dot-pulse w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--ink-secondary)", animationDelay: "400ms" }} />
              </div>
            )}
          </div>

          <div className="px-5 md:px-8 pb-5 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={streaming}
                className="font-mono-label px-3 py-2 border text-left disabled:opacity-40"
                style={{ borderColor: "var(--rule)", color: "var(--ink-secondary)", fontSize: "10px" }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="border-t px-5 md:px-8 py-5 flex items-end gap-3" style={{ borderColor: "var(--rule)" }}>
            <label htmlFor="chat-input" className="sr-only">
              Ask a question about Hamza's work
            </label>
            <textarea
              id="chat-input"
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about his experience, projects, or research..."
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none py-2"
              style={{ color: "var(--ink)", fontSize: "15px", maxHeight: "120px" }}
            />
            {streaming ? (
              <button
                onClick={handleStop}
                className="font-mono-label px-4 py-2.5 border shrink-0"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="font-mono-label px-4 py-2.5 shrink-0 disabled:opacity-40"
                style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
              >
                Send
              </button>
            )}
          </div>
          {rateLimited && (
            <p className="px-5 md:px-8 pb-4 font-mono-label" style={{ color: "var(--accent)", fontSize: "10px" }}>
              One question every couple seconds — give it a moment.
            </p>
          )}
        </div>
      </Reveal>

      <p className="mt-4 font-mono-label" style={{ color: "var(--ink-secondary)" }}>
        AI-generated answers, grounded in a real CV. For anything contractual, email the human.
      </p>
    </section>
  );
}
