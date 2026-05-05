"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { brand, type Service } from "@/lib/content";

const HAIR_TYPES = [
  { value: "fine", label: "Fine / thin" },
  { value: "medium", label: "Medium" },
  { value: "thick", label: "Thick" },
  { value: "very-thick", label: "Very thick / coarse" },
  { value: "not-sure", label: "Not sure" },
] as const;

type Props = {
  services: Service[];
};

export default function BookingForm({ services }: Props) {
  const sp = useSearchParams();
  const initialService = sp?.get("service") ?? "not-sure";

  const [name, setName] = useState("");
  const [hairType, setHairType] = useState<string>("");
  const [serviceSlug, setServiceSlug] = useState<string>(initialService);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const serviceLabel =
      services.find((s) => s.slug === serviceSlug)?.name ?? "Not sure yet";

    const hairTypeLabel =
      HAIR_TYPES.find((h) => h.value === hairType)?.label ?? "Not specified";

    const lines = [
      `Hi! I'd like to book an appointment.`,
      ``,
      `*Name:* ${name || "—"}`,
      `*Hair type:* ${hairTypeLabel}`,
      `*Service:* ${serviceLabel}`,
      date ? `*Preferred date:* ${date}` : null,
      ``,
      message ? `${message}` : null,
    ].filter(Boolean);

    const text = lines.join("\n");
    const url = `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp in new tab
    window.open(url, "_blank", "noopener,noreferrer");

    // Reset submitting after a moment so user can resubmit if needed
    setTimeout(() => setSubmitting(false), 2000);
  };

  // Today's date for min attr on date picker
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-[11px] uppercase tracking-[0.22em] text-[#c9a87c]"
        >
          Your name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="As you'd like us to address you"
          className="mt-2 w-full rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[#f6efe6] placeholder-[#a8957d] focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c]"
        />
      </div>

      {/* Hair type */}
      <div>
        <label
          htmlFor="hair-type"
          className="block text-[11px] uppercase tracking-[0.22em] text-[#c9a87c]"
        >
          Hair type
        </label>
        <select
          id="hair-type"
          required
          value={hairType}
          onChange={(e) => setHairType(e.target.value)}
          className="mt-2 w-full rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[#f6efe6] focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c]"
        >
          <option value="" disabled>
            Select your hair type
          </option>
          {HAIR_TYPES.map((h) => (
            <option key={h.value} value={h.value}>
              {h.label}
            </option>
          ))}
        </select>
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="service"
          className="block text-[11px] uppercase tracking-[0.22em] text-[#c9a87c]"
        >
          Preferred service
        </label>
        <select
          id="service"
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
          className="mt-2 w-full rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[#f6efe6] focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c]"
        >
          <option value="not-sure">Not sure yet — recommend something</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="block text-[11px] uppercase tracking-[0.22em] text-[#c9a87c]"
        >
          Preferred date <span className="text-[#a8957d] normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="date"
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 w-full rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[#f6efe6] focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c] [color-scheme:dark]"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] uppercase tracking-[0.22em] text-[#c9a87c]"
        >
          Anything else? <span className="text-[#a8957d] normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Reference photos, color goals, questions, special occasions…"
          className="mt-2 w-full resize-none rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[#f6efe6] placeholder-[#a8957d] focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c]"
        />
        <p className="mt-2 text-xs text-[#a8957d]">
          Tip: send 2–3 photos of your natural hair (front, back, side) directly
          on WhatsApp after submitting — it speeds up the colour match.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !name || !hairType}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a87c] px-7 py-4 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#d8b889] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        {submitting ? "Opening WhatsApp…" : "Continue on WhatsApp"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </button>

      <p className="text-center text-xs text-[#a8957d]">
        We don&apos;t store your details. Submitting opens WhatsApp with your
        message pre-filled — review and send.
      </p>
    </form>
  );
}
