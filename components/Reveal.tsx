"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The only entrance motion on this site: 8px and opacity, once.
 * DESIGN.md caps translate at 8px so reading is never interrupted by travel.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
