"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Lightweight loader shown between client-side route transitions.
 *
 * Listens for clicks on internal <a> tags and shows a brand-mark
 * overlay until `usePathname()` reports the new path. Filters out
 * external links, hash links, mailto/tel, new-tab clicks, and
 * modifier-key clicks (cmd/ctrl/shift/alt/middle-click).
 *
 * Sits below LoaderLuxe (z-100) at z-90 so the first-load splash
 * still covers this if both happen to render together.
 */
export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  // Intercept clicks on internal links → show loader
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // only left-click without modifiers
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // skip new-tab / external / non-navigational
      if (link.target === "_blank") return;
      if (href.startsWith("http://") || href.startsWith("https://")) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      // strip query/hash before comparing to current pathname
      const pathOnly = href.split("?")[0].split("#")[0];
      if (pathOnly === pathname) return;

      setVisible(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Hide as soon as the new route is active
  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  // Lock scroll while visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0e0b09]/95 backdrop-blur-sm"
          aria-hidden
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="font-script text-3xl text-[#ffb6c1] -mb-1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.05, ease: "easeOut" }}
            >
              The
            </motion.span>
            <motion.span
              className="font-serif text-base tracking-[0.4em] uppercase text-[#f6e9ec]"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.1, ease: "easeOut" }}
            >
              Hair Extensions
            </motion.span>
            <motion.span
              className="font-script text-2xl text-[#ffb6c1] -mt-1"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.18, ease: "easeOut" }}
            >
              Bali
            </motion.span>

            <motion.div
              className="mt-5 h-px w-24 origin-left bg-[#ffb6c1]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.7,
                delay: reduce ? 0 : 0.25,
                ease: [0.65, 0, 0.35, 1],
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
