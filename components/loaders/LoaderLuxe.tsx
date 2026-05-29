"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const MIN_MS = 800;

export default function LoaderLuxe() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, wait);
    };

    // Hide as soon as fonts are ready (so the brand mark animates in
    // crisp), NOT on window.load — that waits for the 4.2MB hero video
    // and made the loader hang on slow first loads. A hard cap of
    // MAX_MS guarantees the loader never lingers regardless.
    const MAX_MS = 1800;
    const hardCap = window.setTimeout(finish, MAX_MS);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(finish);
    } else {
      finish();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(hardCap);
    };
  }, []);

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
          key="loader-luxe"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0e0b09]"
          aria-hidden
        >
          <div className="relative flex flex-col items-center">
            <motion.span
              className="font-script text-4xl text-[#ffb6c1] -mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              The
            </motion.span>
            <motion.span
              className="font-serif text-lg tracking-[0.4em] uppercase text-[#f6e9ec]"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 0.9, delay: reduce ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Hair Extensions
            </motion.span>
            <motion.span
              className="font-script text-3xl text-[#ffb6c1] -mt-1"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Bali
            </motion.span>

            <motion.div
              className="mt-7 h-px bg-[#ffb6c1] origin-left"
              initial={{ scaleX: 0, width: "9rem" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: reduce ? 0 : 0.7, ease: [0.65, 0, 0.35, 1] }}
              style={{ transformOrigin: "left center" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
