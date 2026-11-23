"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import ChatPriceTable from "@/components/ChatPriceTable";
import { brand } from "@/lib/content";

// The AI receptionist: a floating chat that answers from the same facts as the site
// (lib/content.ts) and books appointments itself through /api/chat. Visitors pick English
// or Indonesian, can attach two photos (resized here to JPEG), and see maintenance prices
// as a table when the receptionist shows them.

type Lang = "en" | "id";
type Msg = { role: "user" | "assistant"; content: string; images?: string[]; greeting?: boolean };
type Photo = { url: string; b64: string };

const MAX_INPUT = 600;
const MAX_QUESTIONS = 20;
const MAX_PHOTOS = 2;
const LANG_KEY = "he-chat-lang";
const wa = brand.whatsappDisplay;

const T = {
  en: {
    greeting:
      "Hi, welcome to The Hair Extensions Bali! To help you faster, please tell us:\n1. What you need: new hair or maintenance\n2. Method, if you know it\n3. Colour\n4. Texture\n5. Length\n\nThen attach a photo of your real hair from behind and a picture of your goal (e.g. from Pinterest) with the photo button.",
    suggestions: ["New hair: which method suits me?", "Maintenance prices", "Book a colour match", "Do you do haircuts?"],
    open: "Ask our receptionist",
    subtitle: "Virtual receptionist",
    placeholder: "Type your message…",
    attach: "Attach photos",
    remove: "Remove photo",
    photoText: "Here are my photos.",
    photoNote: (n: number) => ` (${n} photo${n > 1 ? "s" : ""} attached)`,
    photoMax: "You can attach up to 2 photos in this chat.",
    photoError: "That photo couldn't be added. Please try another JPG or PNG.",
    fast: "You're sending messages a little fast — please try again in a minute.",
    down: `Sorry, I can't answer right now. Please message us on WhatsApp: ${wa}.`,
    empty: `Sorry, I couldn't answer that. Please message us on WhatsApp: ${wa}.`,
    lost: `Connection lost. Please try again, or message us on WhatsApp: ${wa}.`,
    limit: "That's the limit for this chat. The team can help with anything else on",
    footer: "AI assistant. Bookings go straight into the studio calendar.",
    typing: "Typing",
    close: "Close chat",
    send: "Send",
  },
  id: {
    greeting:
      "Halo, selamat datang di The Hair Extensions Bali! Supaya kami bisa bantu lebih cepat, ceritakan:\n1. Kebutuhan: rambut baru atau maintenance\n2. Metode, kalau sudah tahu\n3. Warna\n4. Tekstur\n5. Panjang\n\nLalu lampirkan foto rambut asli dari belakang dan foto target (misalnya dari Pinterest) lewat tombol foto.",
    suggestions: ["Rambut baru: metode apa yang cocok?", "Harga maintenance", "Booking colour match", "Bisa potong rambut?"],
    open: "Tanya resepsionis",
    subtitle: "Resepsionis virtual",
    placeholder: "Tulis pesan…",
    attach: "Lampirkan foto",
    remove: "Hapus foto",
    photoText: "Ini foto rambut saya.",
    photoNote: (n: number) => ` (${n} foto terlampir)`,
    photoMax: "Maksimal 2 foto di chat ini.",
    photoError: "Foto itu tidak bisa ditambahkan. Coba foto JPG atau PNG lain.",
    fast: "Pesannya terlalu cepat, coba lagi dalam satu menit ya.",
    down: `Maaf, saya belum bisa menjawab sekarang. Silakan chat kami di WhatsApp: ${wa}.`,
    empty: `Maaf, saya tidak bisa menjawab itu. Silakan chat kami di WhatsApp: ${wa}.`,
    lost: `Koneksi terputus. Coba lagi, atau chat kami di WhatsApp: ${wa}.`,
    limit: "Chat ini sudah mencapai batas. Untuk hal lain, tim kami siap bantu di",
    footer: "Asisten AI. Booking langsung masuk ke kalender studio.",
    typing: "Mengetik",
    close: "Tutup chat",
    send: "Kirim",
  },
};

const storedLang = (): Lang => {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === "en" || v === "id") return v;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
};

/** Shrinks a picked photo to a JPEG of at most 1280 px and roughly 650 KB. */
async function shrink(file: File): Promise<Photo> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  let q = 0.82;
  let url = canvas.toDataURL("image/jpeg", q);
  while (url.length > 900_000 && q > 0.4) {
    q -= 0.12;
    url = canvas.toDataURL("image/jpeg", q);
  }
  return { url, b64: url.slice(url.indexOf(",") + 1) };
}

/** Assistant text with [[maintenance:…]] markers turned into price tables. */
function Rich({ text, lang }: { text: string; lang: Lang }) {
  const parts = text.split(/\[\[maintenance:([a-z-]+)\]\]/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? <ChatPriceTable key={i} method={p} lang={lang} /> : p.trim() ? <span key={i} className="block whitespace-pre-wrap">{p.trim()}</span> : null,
      )}
    </>
  );
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: "", greeting: true }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoIds, setPhotoIds] = useState<string[]>([]);
  const [photoMsg, setPhotoMsg] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const picker = useRef<HTMLInputElement>(null);
  const t = T[lang];
  const asked = messages.filter((m) => m.role === "user").length;
  const limitReached = asked >= MAX_QUESTIONS;
  const photosLeft = MAX_PHOTOS - photoIds.length - photos.length;

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
    const timer = setTimeout(() => field.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => (clearTimeout(timer), window.removeEventListener("keydown", onKey));
  }, [open]);

  const openChat = () => {
    setLang(storedLang());
    setOpen(true);
  };

  const chooseLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  };

  async function addPhotos(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    setPhotoMsg(files.length > photosLeft ? t.photoMax : "");
    const added: Photo[] = [];
    for (const f of files.slice(0, Math.max(0, photosLeft))) {
      try {
        added.push(await shrink(f));
      } catch {
        setPhotoMsg(t.photoError);
      }
    }
    if (added.length) setPhotos((p) => [...p, ...added].slice(0, MAX_PHOTOS - photoIds.length));
  }

  const send = useCallback(
    async (text: string) => {
      const attached = photos;
      const q = (text.trim() || (attached.length ? t.photoText : "")).slice(0, MAX_INPUT);
      if (!q || pending || limitReached) return;
      // Earlier photos aren't re-sent; a note keeps the receptionist aware they exist.
      const history = [
        ...messages.filter((m) => !m.greeting).map((m) => ({ role: m.role, content: m.content + (m.images?.length ? t.photoNote(m.images.length) : "") })),
        { role: "user" as const, content: q },
      ];
      setMessages((m) => [...m, { role: "user", content: q, images: attached.map((p) => p.url) }, { role: "assistant", content: "" }]);
      setInput("");
      setPhotos([]);
      setPhotoMsg("");
      setPending(true);
      const fail = (content: string) => setMessages((m) => [...m.slice(0, -1), { role: "assistant", content }]);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Odd count keeps the window starting on a user turn
          body: JSON.stringify({ messages: history.slice(-11), lang, photoIds, photos: attached.map((p) => p.b64) }),
        });
        if (!res.ok || !res.body) {
          fail(res.status === 429 ? t.fast : t.down);
          return;
        }
        const ids = res.headers.get("X-Photo-Ids");
        if (ids !== null) setPhotoIds(ids ? ids.split(",") : []);
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
        if (!acc.trim()) fail(t.empty);
      } catch {
        fail(t.lost);
      } finally {
        setPending(false);
      }
    },
    [messages, pending, limitReached, photos, photoIds, lang, t],
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
            onClick={openChat}
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
            <span className="hidden text-sm font-medium md:inline">{T.en.open}</span>
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
            className="fixed inset-0 z-[80] flex origin-bottom-right flex-col overflow-hidden bg-[#fbf6f4] text-[#1a1411] sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-[24px] sm:shadow-[0_40px_100px_-30px_rgb(0_0_0/0.85)]"
          >
            <header className="flex items-center justify-between gap-2 bg-[#0e0b09] px-4 py-4 text-[#f6e9ec]">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ffb6c1]/50 font-serif text-[18px] italic text-[#ffb6c1]">H</span>
                <div className="min-w-0">
                  <p className="truncate font-serif text-[17px] leading-none">Hair Extensions Bali</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#f6e9ec]/70">
                    <span className="size-1.5 rounded-full bg-[#7fd39b]" /> {t.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp" className="grid size-9 place-items-center rounded-full text-[#f6e9ec]/80 transition-colors hover:bg-white/10 hover:text-[#f6e9ec]">
                  <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
                    <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2L4 20Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M9.2 8.6c.2-.4.5-.4.7-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .5.5.9 1.3 1.6 2.2 2.1.2.1.4.1.5 0l.5-.5c.2-.2.4-.2.6-.1l1.4.6c.2.1.4.3.4.5v.4c0 .3-.1.6-.4.8-.6.4-1.4.5-2.1.3-2.1-.6-3.8-2.2-4.6-4.2-.3-.8-.2-1.6.3-2.3Z" fill="currentColor" />
                  </svg>
                </a>
                <div role="group" aria-label="Language / Bahasa" className="flex rounded-full border border-white/20 p-0.5 text-[11px] font-medium">
                  {(["en", "id"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => chooseLang(l)}
                      aria-pressed={lang === l}
                      className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-[#ffb6c1] text-[#0e0b09]" : "text-[#f6e9ec]/75 hover:text-[#f6e9ec]"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10">
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div ref={list} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-[#0e0b09] text-[#f6e9ec]" : "rounded-bl-md bg-[#f3e5e2] text-[#1a1411]"
                    }`}
                  >
                    {m.images?.length ? (
                      <div className="mb-2 flex gap-1.5">
                        {m.images.map((src, j) => (
                          // eslint-disable-next-line @next/next/no-img-element -- local preview of the visitor's own photo
                          <img key={j} src={src} alt="" className="h-24 w-20 rounded-lg object-cover" />
                        ))}
                      </div>
                    ) : null}
                    {m.greeting ? (
                      <span className="block whitespace-pre-wrap">{t.greeting}</span>
                    ) : m.content ? (
                      m.role === "assistant" ? <Rich text={m.content} lang={lang} /> : <span className="block whitespace-pre-wrap">{m.content}</span>
                    ) : (
                      <span className="flex gap-1 py-1.5" aria-label={t.typing}>
                        {[0, 1, 2].map((d) => (
                          <motion.span key={d} className="size-1.5 rounded-full bg-[#8a7a76]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {t.suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-[#1a1411]/15 px-3.5 py-2 text-[13px] text-[#1a1411]/80 transition-colors hover:border-[#c97d8a] hover:bg-[#ffb6c1]/25">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {limitReached ? (
              <div className="border-t border-[#1a1411]/10 p-4 text-center text-sm text-[#1a1411]/80">
                {t.limit}{" "}
                <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  WhatsApp
                </a>
                .
              </div>
            ) : (
              <div className="border-t border-[#1a1411]/10">
                {(photos.length > 0 || photoMsg) && (
                  <div className="flex items-center gap-2 px-3 pt-3">
                    {photos.map((p, i) => (
                      <div key={i} className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the visitor's own photo */}
                        <img src={p.url} alt="" className="h-16 w-14 rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotos((ps) => ps.filter((_, j) => j !== i))}
                          aria-label={t.remove}
                          className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-[#0e0b09] text-[11px] text-[#f6e9ec]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {photoMsg && <p className="text-[12px] text-[#a0525f]">{photoMsg}</p>}
                  </div>
                )}
                <form onSubmit={submit} className="flex items-end gap-2 p-3">
                  <input ref={picker} type="file" accept="image/*" multiple hidden onChange={addPhotos} />
                  <button
                    type="button"
                    onClick={() => picker.current?.click()}
                    disabled={pending || photosLeft <= 0}
                    aria-label={`${t.attach} (${Math.max(0, photosLeft)}/${MAX_PHOTOS})`}
                    title={photosLeft <= 0 ? t.photoMax : t.attach}
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-[#1a1411]/15 text-[#1a1411]/70 transition-colors hover:border-[#c97d8a] hover:text-[#1a1411] disabled:opacity-40"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                      <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="9" cy="10" r="1.6" fill="currentColor" />
                      <path d="m5 17 4.5-4.5 3 3 2.5-2.5L19 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <label htmlFor="chat-input" className="sr-only">
                    {t.placeholder}
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
                    placeholder={t.placeholder}
                    data-lenis-prevent
                    className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl bg-[#f3e5e2] px-4 py-3 text-[15px] text-[#1a1411] outline-none placeholder:text-[#8a7a76] focus:ring-2 focus:ring-[#c97d8a]/40"
                  />
                  <button type="submit" disabled={pending || (!input.trim() && !photos.length)} aria-label={t.send} className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0e0b09] text-[#f6e9ec] transition-opacity disabled:opacity-40">
                    <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                      <path d="M10 16V4M5 9l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
            <p className="px-4 pb-3 text-center text-[11px] text-[#8a7a76]">{t.footer}</p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
