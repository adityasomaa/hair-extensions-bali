"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const MIN_MS = 1500;

export default function LoaderBoho() {
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-boho"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.83, 0, 0.17, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fef7ee]"
          aria-hidden
        >
          {/* Curved wipe overlay on exit */}
          <motion.svg
            className="pointer-events-none absolute inset-x-0 -bottom-[1px] w-full"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            initial={{ opacity: 1 }}
          >
            <path
              d="M0 0 C 240 80, 480 0, 720 40 S 1200 80, 1440 40 L 1440 0 Z"
              fill="#fef7ee"
            />
          </motion.svg>

          <div className="relative flex flex-col items-center text-center">
            {/* Rotating sun */}
            <motion.svg
              viewBox="0 0 100 100"
              fill="none"
              className="h-24 w-24 text-[#d4a574]"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              aria-hidden
            >
              <circle cx="50" cy="50" r="18" fill="currentColor" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 * Math.PI) / 180;
                const x1 = 50 + Math.cos(a) * 28;
                const y1 = 50 + Math.sin(a) * 28;
                const x2 = 50 + Math.cos(a) * 42;
                const y2 = 50 + Math.sin(a) * 42;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.svg>

            <motion.div
              className="mt-6 leading-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="font-display-serif text-2xl text-[#3d2c1e]">Hair Extensions</div>
              <div className="font-script text-2xl text-[#c66a3d] -mt-1">Bali</div>
            </motion.div>

            <motion.div
              className="mt-5 flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.55, duration: 0.4 }}
              aria-hidden
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#c66a3d]"
                  animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
