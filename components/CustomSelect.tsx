"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  /** When true the hidden form input gets the `required` attribute so
   *  native HTML5 validation still triggers on the parent <form>. */
  required?: boolean;
  /** Optional disabled "placeholder option" added to the top of the list. */
  placeholderIsOption?: boolean;
};

/**
 * Brand-styled dropdown that replaces native <select>. Built because:
 *
 *   1. Cross-browser native <option> styling is unreliable (Chrome on
 *      Windows ignores per-option backgrounds in many cases).
 *   2. We want the open panel to match the dark brand theme exactly,
 *      not pop a system widget.
 *
 * Closes on outside click, on Escape, and on selection. Keyboard nav
 * (↑/↓/Home/End/Enter) supported. A hidden read-only <input> mirrors
 * the value so HTML5 form validation still fires.
 */
export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required = false,
  placeholderIsOption = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Escape; init highlight when opening
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);

    // start highlight at current value or first option
    const idx = value ? options.findIndex((o) => o.value === value) : 0;
    setHighlightedIdx(idx >= 0 ? idx : 0);

    return () => document.removeEventListener("keydown", onKey);
  }, [open, value, options]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!open || highlightedIdx < 0) return;
    const el = listRef.current?.querySelectorAll<HTMLButtonElement>(
      "[role='option']",
    )[highlightedIdx];
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIdx, open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlightedIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlightedIdx(options.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlightedIdx];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative mt-2">
      {/* Trigger */}
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKey}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between gap-3 rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-left text-[#f6e9ec] transition-colors hover:border-[#ffb6c1]/40 focus:border-[#ffb6c1] focus:outline-none focus:ring-1 focus:ring-[#ffb6c1]"
      >
        <span className={selected ? "" : "text-[#ab9aa1]"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[#ffb6c1] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {/* Hidden field — keeps native form validation working */}
      <input
        type="text"
        required={required}
        value={value}
        readOnly
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute left-0 top-full h-0 w-0 opacity-0"
        onChange={() => {}}
      />

      {/* Dropdown panel */}
      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-sm border border-[#ffb6c1]/30 bg-[#0e0b09] py-1 shadow-2xl shadow-black/50"
        >
          {placeholderIsOption && !selected && (
            <div className="px-4 py-2 text-xs italic text-[#ab9aa1]">
              {placeholder}
            </div>
          )}
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isHighlighted = i === highlightedIdx;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlightedIdx(i)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  isHighlighted ? "bg-[#ffb6c1]/10" : ""
                } ${
                  isSelected ? "text-[#ffb6c1]" : "text-[#f6e9ec]"
                } hover:bg-[#ffb6c1]/10`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
