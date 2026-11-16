"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { brand } from "@/lib/content";

// The AI receptionist: a floating chat that answers from the same facts as the site
// (lib/content.ts) and books appointments itself through /api/chat.

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, welcome to The Hair Extensions Bali! Ask me about methods, prices or which extensions suit your hair, and I can book your visit right here. Bisa juga dalam Bahasa Indonesia.",
};
const SUGGESTIONS = ["Which method suits fine hair?", "How much is Keratin Bond?", "Book a colour match", "Do you do haircuts?"];
const MAX_INPUT = 600;
const MAX_QUESTIONS = 20;

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const asked = messages.filter((m) => m.role === "user").length;
  const limitReached = asked >= MAX_QUESTIONS;

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Full-screen on phones: keep the page behind it from scrolling.
  useEffect(() => {
    if (!open || window.innerWidth >= 640) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => field.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => (clearTimeout(t), window.removeEventListener("keydown", onKey));
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim().slice(0, MAX_INPUT);
      if (!q || pending || limitReached) return;
      const history = [...messages.filter((m) => m !== GREETING), { role: "user" as const, content: q }];
      setMessages((m) => [...m, { role: "user", content: q }, { role: "assistant", content: "" }]);
      setInput("");
      setPending(true);
      const fail = (content: string) => setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }]);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Odd count keeps the window starting on a user turn
          body: JSON.stringify({ messages: history.slice(-11) }),
        });
        if (!res.ok || !res.body) {
          fail(res.status === 429 ? "You're sending messages a little fast — please try again in a minute." : `Sorry, I can't answer right now. Please message us on WhatsApp: ${brand.whatsappDisplay}.`);
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          const snapshot = acc;
          setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: snapshot }]);
        }
        if (!acc.trim()) fail(`Sorry, I couldn't answer that. Please message us on WhatsApp: ${brand.whatsappDisplay}.`);
      } catch {
        fail(`Connection lost. Please try again, or message us on WhatsApp: ${brand.whatsappDisplay}.`);
      } finally {
        setPending(false);
      }
    },
    [messages, pending, limitReached],
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            // Sits above the floating WhatsApp button on phones; bottom-right on desktop.
            className="fixed bottom-24 right-6 z-[60] flex items-center gap-3 rounded-full border border-[#ffb6c1]/40 bg-[#1a1411] p-2 text-[#f6e9ec] shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)] transition-colors hover:border-[#ffb6c1] md:bottom-6 md:pr-5"
            aria-label="Open chat with The Hair Extensions Bali receptionist"
          >
            <span className="relative grid size-10 place-items-center rounded-full bg-[#ffb6c1] text-[#0e0b09]">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1.1-3.1A7.9 7.9 0 0 1 4 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-[#1a1411] bg-[#7fd39b]" />
            </span>
            <span className="hidden text-sm font-medium md:inline">Ask our receptionist</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with The Hair Extensions Bali"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex origin-bottom-right flex-col overflow-hidden bg-[#fbf6f4] text-[#1a1411] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-[24px] sm:shadow-[0_40px_100px_-30px_rgb(0_0_0/0.85)]"
          >
            <header className="flex items-center justify-between gap-3 bg-[#0e0b09] px-5 py-4 text-[#f6e9ec]">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ffb6c1]/50 font-serif text-[18px] italic text-[#ffb6c1]">H</span>
                <div>
                  <p className="font-serif text-[17px] leading-none">Hair Extensions Bali</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#f6e9ec]/70">
                    <span className="size-1.5 rounded-full bg-[#7fd39b]" /> Virtual receptionist
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full px-3 py-2 text-xs text-[#f6e9ec]/80 transition-colors hover:bg-white/10 hover:text-[#f6e9ec]">
                  WhatsApp
                </a>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10">
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div ref={list} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-[#0e0b09] text-[#f6e9ec]" : "rounded-bl-md bg-[#f3e5e2] text-[#1a1411]"
                    }`}
                  >
                    {m.content || (
                      <span className="flex gap-1 py-1.5" aria-label="Typing">
                        {[0, 1, 2].map((d) => (
                          <motion.span key={d} className="size-1.5 rounded-full bg-[#8a7a76]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                        ))}
                      </span>
                    )}
                  </p>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-[#1a1411]/15 px-3.5 py-2 text-[13px] text-[#1a1411]/80 transition-colors hover:border-[#c97d8a] hover:bg-[#ffb6c1]/25">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {limitReached ? (
              <div className="border-t border-[#1a1411]/10 p-4 text-center text-sm text-[#1a1411]/80">
                That&apos;s the limit for this chat. The team can help with anything else on{" "}
                <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  WhatsApp
                </a>
                .
              </div>
            ) : (
              <form onSubmit={submit} className="flex items-end gap-2 border-t border-[#1a1411]/10 p-3">
                <label htmlFor="chat-input" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="chat-input"
                  ref={field}
                  rows={1}
                  value={input}
                  maxLength={MAX_INPUT}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Type your question…"
                  data-lenis-prevent
                  className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl bg-[#f3e5e2] px-4 py-3 text-[15px] text-[#1a1411] outline-none placeholder:text-[#8a7a76] focus:ring-2 focus:ring-[#c97d8a]/40"
                />
                <button type="submit" disabled={pending || !input.trim()} aria-label="Send" className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0e0b09] text-[#f6e9ec] transition-opacity disabled:opacity-40">
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                    <path d="M10 16V4M5 9l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </form>
            )}
            <p className="px-4 pb-3 text-center text-[11px] text-[#8a7a76]">AI assistant. Bookings go straight into the studio calendar.</p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
