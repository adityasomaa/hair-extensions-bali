"use client";

import { useState } from "react";

type FaqAnswer =
  | string
  | {
      intro?: string;
      items?: { label: string; body: string }[];
      outro?: string;
    };

type FaqItem = { q: string; a: FaqAnswer };

/**
 * Renders the structured FAQ answer. Plain strings render as a single
 * paragraph; structured answers render as intro → labelled list → outro
 * so each method/point is scannable on its own line.
 */
function Answer({ a }: { a: FaqAnswer }) {
  if (typeof a === "string") {
    return (
      <p className="text-sm leading-relaxed text-[#c2b3b8] md:text-base">{a}</p>
    );
  }

  return (
    <div className="space-y-5">
      {a.intro && (
        <p className="text-sm leading-relaxed text-[#c2b3b8] md:text-base">
          {a.intro}
        </p>
      )}

      {a.items && a.items.length > 0 && (
        <dl className="space-y-3 border-l border-[#ffb6c1]/25 pl-5">
          {a.items.map((item) => (
            <div
              key={item.label}
              className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-5"
            >
              <dt className="text-sm font-medium text-[#f6e9ec] md:text-base">
                {item.label}
              </dt>
              <dd className="text-sm leading-relaxed text-[#c2b3b8] md:text-base">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {a.outro && (
        <p className="text-sm leading-relaxed text-[#c2b3b8] md:text-base">
          {a.outro}
        </p>
      )}
    </div>
  );
}

/**
 * Animated FAQ accordion.
 *
 * Uses the grid-template-rows trick (0fr → 1fr) so the answer can
 * animate from height 0 to "auto" with pure CSS — no measuring, no
 * library. Multiple items can be open at once (preserves the original
 * <details> behaviour).
 */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => {
        const isOpen = openSet.has(i);
        return (
          <div key={f.q} className="py-6">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-baseline justify-between gap-4 text-left"
            >
              <span className="font-serif text-lg leading-tight text-[#f6e9ec] md:text-xl">
                {f.q}
              </span>
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#ffb6c1]/40 text-[#ffb6c1] transition-transform duration-300 ease-out ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  className={`mt-4 max-w-2xl transition-opacity duration-300 ease-out ${
                    isOpen ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  <Answer a={f.a} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
