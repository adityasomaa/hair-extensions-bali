"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const REDUCE_MOTION = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Direction = "up" | "down" | "left" | "right" | "none";

function offsetFor(dir: Direction, distance: number) {
  switch (dir) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return {};
  }
}

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  start?: string; // ScrollTrigger start
  once?: boolean;
  as?: "div" | "section" | "article" | "header" | "li" | "p" | "span" | "h1" | "h2" | "h3";
};

/** Scroll-triggered fade + slide reveal. Replaces FadeIn for new pages. */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  distance = 28,
  duration = 0.85,
  delay = 0,
  start = "top 85%",
  once = true,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (REDUCE_MOTION()) {
        gsap.set(ref.current, { opacity: 1, x: 0, y: 0 });
        return;
      }
      const offset = offsetFor(direction, distance);
      gsap.fromTo(
        ref.current,
        { opacity: 0, ...offset },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type ScrollStaggerProps = {
  children: ReactNode;
  className?: string;
  selector?: string; // child selector to stagger; defaults to direct children
  direction?: Direction;
  distance?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

/** Scroll-triggered stagger over children. Use selector to scope. */
export function ScrollStagger({
  children,
  className,
  selector = ":scope > *",
  direction = "up",
  distance = 24,
  duration = 0.7,
  stagger = 0.1,
  delay = 0,
  start = "top 85%",
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll(selector);
      if (!targets.length) return;
      if (REDUCE_MOTION()) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0 });
        return;
      }
      const offset = offsetFor(direction, distance);
      gsap.fromTo(
        targets,
        { opacity: 0, ...offset },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref, dependencies: [selector] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  intensity?: number; // -1 (against scroll) to 1 (with scroll), 0 = none
};

/** Subtle parallax — element drifts on scroll. Use for hero photos. */
export function ParallaxScroll({
  children,
  className,
  intensity = 0.18,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (REDUCE_MOTION()) return;
      gsap.to(ref.current, {
        yPercent: -intensity * 30,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type PinSectionProps = {
  children: ReactNode;
  className?: string;
  /** Pin distance — how far the section stays pinned (in viewport heights, e.g. "+=100%") */
  pinSpacing?: string;
};

/** Pin a section while content underneath scrolls past. For story-style sequences. */
export function PinSection({
  children,
  className,
  pinSpacing = "+=100%",
}: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (REDUCE_MOTION()) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: pinSpacing,
        pin: true,
        pinSpacing: true,
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type AccentLineProps = {
  className?: string;
  origin?: "left" | "right" | "center";
  duration?: number;
  delay?: number;
};

/** Animated underline rule — scales from origin on scroll-in. */
export function AccentLine({
  className = "h-px w-32 bg-current",
  origin = "left",
  duration = 1,
  delay = 0,
}: AccentLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (REDUCE_MOTION()) {
        gsap.set(ref.current, { scaleX: 1 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      style={{ transformOrigin: origin }}
      className={className}
      aria-hidden
    />
  );
}

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "left-to-right" | "top-to-bottom";
};

/** Clip-path reveal — wipes the element into view. Good for hero photos. */
export function ClipReveal({
  children,
  className,
  duration = 1.2,
  delay = 0,
  direction = "left-to-right",
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (REDUCE_MOTION()) {
        gsap.set(ref.current, { clipPath: "inset(0 0% 0 0)" });
        return;
      }
      const from = direction === "left-to-right" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
      gsap.fromTo(
        ref.current,
        { clipPath: from },
        {
          clipPath: "inset(0 0% 0 0)",
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
