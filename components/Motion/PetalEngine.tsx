"use client";

import { motion, useReducedMotion } from "framer-motion";

import styles from "@/components/Motion/PetalEngine.module.css";

type PetalSpec = {
  id: string;
  xStart: number;
  xMid: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  delay: number;
  duration: number;
  size: "sm" | "md" | "lg";
};

const petals: PetalSpec[] = [
  {
    id: "p1",
    xStart: -5,
    xMid: 30,
    xEnd: 65,
    yStart: 8,
    yEnd: 88,
    delay: 0,
    duration: 38,
    size: "sm"
  },
  {
    id: "p2",
    xStart: 12,
    xMid: 42,
    xEnd: 75,
    yStart: -8,
    yEnd: 84,
    delay: 8,
    duration: 46,
    size: "md"
  },
  {
    id: "p3",
    xStart: 80,
    xMid: 60,
    xEnd: 35,
    yStart: 3,
    yEnd: 92,
    delay: 3,
    duration: 42,
    size: "sm"
  },
  {
    id: "p4",
    xStart: 102,
    xMid: 72,
    xEnd: 42,
    yStart: 10,
    yEnd: 86,
    delay: 12,
    duration: 50,
    size: "lg"
  },
  {
    id: "p5",
    xStart: 24,
    xMid: 50,
    xEnd: 92,
    yStart: -10,
    yEnd: 82,
    delay: 17,
    duration: 44,
    size: "md"
  }
];

export const PetalEngine = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className={styles.field} aria-hidden>
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className={`${styles.petal} ${styles[petal.size]}`}
          initial={{
            x: `${petal.xStart}vw`,
            y: `${petal.yStart}vh`,
            opacity: 0,
            rotate: -12
          }}
          animate={{
            x: [`${petal.xStart}vw`, `${petal.xMid}vw`, `${petal.xEnd}vw`],
            y: [`${petal.yStart}vh`, `${petal.yEnd / 2}vh`, `${petal.yEnd}vh`],
            opacity: [0, 0.2, 0.28, 0],
            rotate: [-12, 18, 52]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
