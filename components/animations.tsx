"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
  type HTMLMotionProps,
} from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "footer" | "h1" | "h2" | "h3" | "p" | "span";
};

function getOffset(direction: Direction, distance: number) {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    case "none":
    default: return {};
  }
}

/** Fades in + slides children when scrolled into view. */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  distance = 24,
  direction = "up",
  once = true,
  amount = 0.2,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const offset = reduce ? {} : getOffset(direction, distance);

  return (
    <Comp
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  duration?: number;
  distance?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
  className?: string;
};

/** Staggers each direct child as they enter view. Children should be normal elements. */
export function Stagger({
  children,
  delay = 0,
  stagger = 0.1,
  duration = 0.6,
  distance = 20,
  direction = "up",
  amount = 0.15,
  once = true,
  className,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const offset = reduce ? {} : getOffset(direction, distance);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={item}>{children}</motion.div>
          )}
    </motion.div>
  );
}

type ClipRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

/** Clip-path mask reveal — wipes from left to right. Good for hero photos & headlines. */
export function ClipReveal({
  children,
  delay = 0,
  duration = 1.1,
  className,
}: ClipRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.77, 0, 0.18, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type LineProps = {
  delay?: number;
  duration?: number;
  className?: string;
  origin?: "left" | "right" | "center";
};

/** Animated line — scales from origin. Good for accent rules & underlines. */
export function AccentLine({
  delay = 0,
  duration = 1,
  className = "h-px w-full bg-current",
  origin = "left",
}: LineProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{ transformOrigin: origin }}
      className={className}
      aria-hidden
    />
  );
}

type ParallaxProps = {
  children: ReactNode;
  intensity?: number;
  className?: string;
};

/** Subtle parallax — element drifts on scroll. Use for hero photos. */
export function Parallax({ children, intensity = 0.15, className }: ParallaxProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: intensity * -60 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ ease: "linear", duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Animate by "word" or "char" (char is heavier) */
  by?: "word" | "char";
};

/** Type reveal — splits and animates each word/char in sequence. */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  as = "h2",
  by = "word",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const parts = by === "word" ? text.split(/(\s+)/) : Array.from(text);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const part: Variants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduce ? 0 : duration,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
      className={className}
    >
      {parts.map((p, i) =>
        p.match(/^\s+$/) ? (
          <span key={i} aria-hidden>
            {p}
          </span>
        ) : (
          <span
            key={i}
            aria-hidden
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
          >
            <motion.span variants={part} style={{ display: "inline-block" }}>
              {p}
            </motion.span>
          </span>
        )
      )}
    </Comp>
  );
}

/** Scale-in pop with spring physics — playful for sticker badges & boho. */
export function PopIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const transition: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 220, damping: 18, delay };

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Hover-reactive wrapper — gently lifts on hover. */
export function HoverLift({
  children,
  lift = 4,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { lift?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -lift }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Continuous slow rotation — for decorative shapes (sun, blob). */
export function SlowSpin({
  children,
  duration = 24,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
