"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string | undefined;
  delay?: number | undefined;
}>;

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        delay
      }}
    >
      {children}
    </motion.div>
  );
};
