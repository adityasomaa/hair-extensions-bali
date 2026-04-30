"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const MIN_MS = 1500;
const ACCENT = "#ff3d6e";

export default function LoaderEditorial() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      const fallback = window.setTimeout(finish, 3500);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const lines = [
    { text: "THE", weight: "thin" },
    { text: "HAIR EXTENSIONS", weight: "bold" },
    { text: "BALI", weight: "bold" },
  ] as const;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-editorial"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.65, ease: [0.83, 0, 0.17, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-stretch justify-between bg-black text-white"
          aria-hidden
        >
          {/* Top utility */}
          <motion.div
            className="flex items-center justify-between border-b border-white/15 px-6 py-3 font-condensed text-[10px] uppercase tracking-[0.3em] text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.1, duration: 0.4 }}
          >
            <span>★ Issue 01</span>
            <span>Loading…</span>
          </motion.div>

          {/* Center text reveal */}
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="text-center leading-[0.85]">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden"
                  style={{ paddingBottom: "0.05em" }}
                >
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      delay: reduce ? 0 : 0.25 + idx * 0.12,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className={
                      line.weight === "thin"
                        ? "font-condensed text-2xl uppercase tracking-[0.3em] text-white/55 md:text-3xl"
                        : "font-condensed text-6xl uppercase tracking-tight text-white md:text-8xl lg:text-[10rem]"
                    }
                    style={
                      idx === 2
                        ? { color: ACCENT, fontStyle: "italic" }
                        : undefined
                    }
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom progress */}
          <motion.div
            className="h-1 origin-left"
            style={{ backgroundColor: ACCENT }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduce ? 0 : 1.4,
              delay: reduce ? 0 : 0.1,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
