"use client";

import { useEffect } from "react";
import { reportContactConversion } from "@/lib/gtag";

/**
 * Google Ads "Contact" conversion — click-type, per Google's event
 * snippet recommendation. Instead of sprinkling gtag_report_conversion
 * onclick handlers over every WhatsApp link (many live in server
 * components), one capture-phase listener watches for clicks on any
 * link pointing to WhatsApp and reports the conversion.
 *
 * Covers: nav + mobile menu, hero CTA, why-visit-us, booking section,
 * footer, floating mobile button, blog in-article CTAs — and any
 * WhatsApp link added in the future.
 */
export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!/wa\.me|api\.whatsapp\.com/.test(href)) return;

      reportContactConversion();
    };

    // Capture phase so the event is recorded before navigation begins.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
