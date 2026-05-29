"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: string;
  /** ISO yyyy-mm-dd string, or "" */
  value: string;
  onChange: (value: string) => void;
  /** ISO yyyy-mm-dd — earliest selectable date */
  min?: string;
  placeholder?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Local date helpers — avoid UTC drift by working with y/m/d ints.
function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function parseISO(s: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!match) return null;
  return { y: +match[1], m: +match[2] - 1, d: +match[3] };
}

/**
 * Brand-themed date picker. Replaces the native <input type="date">
 * (whose calendar popup can't be styled to match the dark theme).
 *
 * - Trigger shows the chosen date or placeholder + calendar icon
 * - Panel: month nav + day grid, dates before `min` disabled
 * - Closes on outside click / Escape / pick
 * - data-lenis-prevent so the panel never hijacks page scroll
 * - A hidden mirror input keeps the value available to the form
 */
export default function CustomDatePicker({
  id,
  value,
  onChange,
  min,
  placeholder = "Select a date",
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = parseISO(value);
  const minDate = min ? parseISO(min) : null;

  // Month currently shown in the panel
  const [view, setView] = useState(() => {
    const base = selected ?? minDate ?? null;
    if (base) return { y: base.y, m: base.m };
    // Fallback: can't call new Date() with no args in some sandboxes,
    // so derive "now" from the min prop if present, else 2026-01.
    return { y: 2026, m: 0 };
  });

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Re-sync view to selected month each time the panel opens
  useEffect(() => {
    if (open && selected) setView({ y: selected.y, m: selected.m });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const grid = useMemo(() => {
    const firstDay = new Date(view.y, view.m, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const isBeforeMin = (d: number) => {
    if (!minDate) return false;
    if (view.y < minDate.y) return true;
    if (view.y > minDate.y) return false;
    if (view.m < minDate.m) return true;
    if (view.m > minDate.m) return false;
    return d < minDate.d;
  };

  const prevMonth = () =>
    setView((v) => (v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }));
  const nextMonth = () =>
    setView((v) => (v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }));

  const displayLabel = selected
    ? `${selected.d} ${MONTHS[selected.m]} ${selected.y}`
    : placeholder;

  return (
    <div ref={containerRef} className="relative mt-2">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-left transition-colors hover:border-[#ffb6c1]/40 focus:border-[#ffb6c1] focus:outline-none focus:ring-1 focus:ring-[#ffb6c1]"
      >
        <span className={selected ? "text-[#f6e9ec]" : "text-[#ab9aa1]"}>
          {displayLabel}
        </span>
        <Calendar className="h-4 w-4 flex-shrink-0 text-[#ffb6c1]" aria-hidden />
      </button>

      {/* Hidden mirror for the form */}
      <input type="hidden" value={value} readOnly aria-hidden />

      {open && (
        <div
          data-lenis-prevent
          role="dialog"
          aria-label="Choose a date"
          className="absolute left-0 top-full z-20 mt-1 w-[19rem] rounded-sm border border-[#ffb6c1]/30 bg-[#0e0b09] p-4 shadow-2xl shadow-black/50"
        >
          {/* Month nav */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="grid h-8 w-8 place-items-center rounded-full text-[#ffb6c1] transition-colors hover:bg-[#ffb6c1]/10"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <span className="font-serif text-sm text-[#f6e9ec]">
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="grid h-8 w-8 place-items-center rounded-full text-[#ffb6c1] transition-colors hover:bg-[#ffb6c1]/10"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {/* Weekday header */}
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.12em] text-[#ab9aa1]">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {grid.map((d, i) => {
              if (d === null) return <span key={`e-${i}`} />;
              const iso = toISO(view.y, view.m, d);
              const isSelected = value === iso;
              const disabled = isBeforeMin(d);
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm transition-colors ${
                    isSelected
                      ? "bg-[#ffb6c1] font-medium text-[#0e0b09]"
                      : disabled
                        ? "cursor-not-allowed text-[#5a4f54]"
                        : "text-[#f6e9ec] hover:bg-[#ffb6c1]/15"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Footer actions */}
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-xs text-[#ab9aa1] transition-colors hover:text-[#ffb6c1]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-[#ffb6c1] transition-colors hover:text-[#ffc9d2]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
