"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

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
                <p
                  className={`mt-3 max-w-2xl text-sm leading-relaxed text-[#c2b3b8] md:text-base transition-opacity duration-300 ease-out ${
                    isOpen ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
