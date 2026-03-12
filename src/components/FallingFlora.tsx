import type { CSSProperties } from "react";
import { useMemo } from "react";

import styles from "./FallingFlora.module.css";

const PARTICLE_COUNT = 28;

const LEAF_COLORS = [
  "var(--lyfie-green)",
  "#c2de8c",
  "var(--lyfie-green-deep)"
];
const PETAL_COLORS = [
  "var(--lyfie-pink)",
  "#f9c2c7",
  "var(--lyfie-pink-deep)"
];

type FloraKind = "leaf" | "petal";

type Particle = {
  id: string;
  kind: FloraKind;
  variant: number;
  color: string;
  style: CSSProperties;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]!;

function createParticle(index: number): Particle {
  const kind: FloraKind = Math.random() < 0.56 ? "petal" : "leaf";
  const variant = Math.floor(rand(0, 3));
  const size = kind === "leaf" ? rand(14, 32) : rand(10, 26);
  const duration = rand(17, 35);
  const delay = rand(-duration, 0);
  const swayDuration = rand(3.5, 8.8);
  const spinDuration = rand(2.8, 7.2);
  const startX = rand(-22, 36);
  const startY = rand(-38, 14);
  const endX = startX + rand(58, 112);
  const endY = rand(106, 156);
  const rotateStart = rand(-46, 42);
  const rotateEnd = rotateStart + rand(120, 420);
  const drift = rand(5, 26);
  const opacity = rand(0.35, 0.8);
  const scale = rand(0.72, 1.2);
  const color = kind === "leaf" ? pick(LEAF_COLORS) : pick(PETAL_COLORS);

  return {
    id: `${kind}-${index}`,
    kind,
    variant,
    color,
    style: {
      "--x0": `${startX}vw`,
      "--y0": `${startY}vh`,
      "--x1": `${endX}vw`,
      "--y1": `${endY}vh`,
      "--r0": `${rotateStart}deg`,
      "--r1": `${rotateEnd}deg`,
      "--duration": `${duration}s`,
      "--delay": `${delay}s`,
      "--sway-duration": `${swayDuration}s`,
      "--spin-duration": `${spinDuration}s`,
      "--drift": `${drift}px`,
      "--size": `${size}px`,
      "--opacity": opacity.toFixed(3),
      "--scale": scale.toFixed(3)
    } as CSSProperties
  };
}

function FloraShape({
  kind,
  variant,
  color
}: {
  kind: FloraKind;
  variant: number;
  color: string;
}) {
  if (kind === "leaf") {
    if (variant === 1) {
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path
            d="M4 19C4 10 11 4 20 4H28V12C28 21 21 28 12 28H4V19Z"
            fill={color}
          />
          <path
            d="M7 24L24 8M13 27L27 13"
            stroke="rgb(38 60 18 / 0.4)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (variant === 2) {
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path
            d="M16 2C22 7 26 13 26 20C26 25 22 29 16 30C10 29 6 25 6 20C6 13 10 7 16 2Z"
            fill={color}
          />
          <path
            d="M16 6V27M16 13C12 16 10 19 9 22M16 13C20 16 22 19 23 22"
            stroke="rgb(35 57 16 / 0.33)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M3 20C4 11 11 5 20 5C25 5 29 7 29 7C29 7 27 11 24 17C22 22 18 26 11 27C7 27 4 24 3 20Z"
          fill={color}
        />
        <path
          d="M8 23C15 17 19 13 26 8M13 26C13 21 14 18 16 15"
          stroke="rgb(36 58 17 / 0.32)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M16 3C21 3 25 8 25 14C25 20 20 27 16 29C12 27 7 20 7 14C7 8 11 3 16 3Z"
          fill={color}
        />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          d="M16 4C20 4 24 8 24 13C24 18 20 24 16 28C12 24 8 18 8 13C8 8 12 4 16 4Z"
          fill={color}
        />
        <path
          d="M16 8V23"
          stroke="rgb(130 76 79 / 0.36)"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 3C21 3 28 10 28 15C28 22 21 28 16 29C11 28 4 22 4 15C4 10 11 3 16 3Z"
        fill={color}
      />
      <path
        d="M16 7C19 10 22 13 24 16C22 19 19 22 16 25C13 22 10 19 8 16C10 13 13 10 16 7Z"
        fill="rgb(255 255 255 / 0.16)"
      />
    </svg>
  );
}

export default function FallingFlora() {
  const particles = useMemo(
    () => Array.from({ length: PARTICLE_COUNT }, (_, index) => createParticle(index)),
    []
  );

  return (
    <div className={styles.layer} aria-hidden="true">
      {particles.map((particle) => (
        <span key={particle.id} className={styles.particle} style={particle.style}>
          <span className={styles.wobble}>
            <span className={styles.glyph}>
              <FloraShape
                kind={particle.kind}
                variant={particle.variant}
                color={particle.color}
              />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
