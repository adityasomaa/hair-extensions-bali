"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  /** When true, the loop only starts once it scrolls into view (saves bandwidth/CPU) */
  lazy?: boolean;
  /** Object-fit class — defaults to cover */
  objectClass?: string;
};

/**
 * Auto-playing, muted, looping background video with poster fallback.
 * Respects `prefers-reduced-motion` — falls back to static poster.
 */
export default function VideoLoop({
  src,
  poster,
  alt = "",
  className = "",
  lazy = true,
  objectClass = "object-cover",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(!lazy);

  // Detect reduced-motion preference
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const onChange = () => setReduce(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  // Lazy: start when in view
  useEffect(() => {
    if (!lazy) return;
    const node = ref.current?.parentElement;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldPlay(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [lazy]);

  // If reduced motion, render poster as still image
  if (reduce) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={poster}
          alt={alt}
          fill
          className={objectClass}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={shouldPlay ? src : undefined}
        poster={poster}
        autoPlay={shouldPlay}
        muted
        playsInline
        loop
        preload={lazy ? "metadata" : "auto"}
        className={`absolute inset-0 h-full w-full ${objectClass}`}
        aria-label={alt}
      />
    </div>
  );
}
