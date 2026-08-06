"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

export function AnimatedSection({ children, className, ...props }: HTMLMotionProps<"section">) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      initial={prefersReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
