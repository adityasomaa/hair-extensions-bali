"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  alt?: string;
};

/**
 * Drag-handle before/after slider.
 * - Click & drag the divider to reveal the "after" image.
 * - Keyboard: focus + arrow keys.
 */
export default function BeforeAfter({ before, after, alt = "Before and after" }: Props) {
  const [pos, setPos] = useState(50); // % from left where divider sits
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const onMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const next = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(next);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      onMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current || !e.touches[0]) return;
      onMove(e.touches[0].clientX);
    };
    const stop = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 select-none touch-none"
      onMouseDown={(e) => {
        draggingRef.current = true;
        onMove(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        if (e.touches[0]) onMove(e.touches[0].clientX);
      }}
    >
      {/* AFTER (full bleed, behind) */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt={`${alt} — after`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      </div>

      {/* BEFORE (clipped to left of divider) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — before`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#0e0b09]/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#c9a87c] backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#0e0b09]/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#c9a87c] backdrop-blur-sm">
        After
      </span>

      {/* Divider */}
      <div
        className="absolute inset-y-0 w-px bg-[#c9a87c]"
        style={{ left: `${pos}%` }}
        aria-hidden
      />

      {/* Handle */}
      <button
        type="button"
        onKeyDown={onKey}
        aria-label="Drag to reveal before/after"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="slider"
        className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-[#c9a87c] bg-[#0e0b09]/85 backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a87c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0b09]"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c9a87c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M9 6L3 12l6 6" />
          <path d="M15 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
