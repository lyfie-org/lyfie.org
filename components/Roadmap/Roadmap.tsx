"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

import styles from "@/components/Roadmap/Roadmap.module.css";

type Milestone = {
  phase: "Now" | "Next" | "Future";
  product: string;
  summary: string;
  url?: string;
};

const milestones: Milestone[] = [
  {
    phase: "Now",
    product: "Luthor",
    summary:
      "The flagship deployment-first platform for clean, reproducible self-hosting.",
    url: "https://luthor.fyi"
  },
  {
    phase: "Next",
    product: "Papyra",
    summary:
      "A privacy-first, self-hosted alternative to Google Keep for teams and individuals.",
    url: "https://papyra.app"
  },
  {
    phase: "Future",
    product: "Rokada + Lyfie-app",
    summary:
      "New experiences designed to keep ownership, flexibility, and speed in your hands."
  }
];

export const Roadmap = () => {
  const shouldReduceMotion = useReducedMotion();
  const cardMotionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 }
      };

  return (
    <section id="roadmap" className={styles.roadmap} aria-labelledby="roadmap-title">
      <div className={styles.header}>
        <p className={styles.kicker}>Product Matrix</p>
        <h2 id="roadmap-title" className={styles.title}>
          A phased roadmap engineered for momentum
        </h2>
      </div>

      <div className={styles.trackWrap}>
        <svg
          className={styles.track}
          viewBox="0 0 1080 170"
          role="presentation"
          aria-hidden
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 30 135 C 210 18, 360 18, 540 88 S 870 158, 1040 42"
            fill="none"
            stroke="var(--track-line)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
          />
        </svg>

        <div className={styles.grid}>
          {milestones.map((milestone, index) => (
            <motion.article
              key={milestone.product}
              className={styles.card ?? ""}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                delay: index * 0.1
              }}
              {...cardMotionProps}
            >
              <p className={styles.phase}>{milestone.phase}</p>
              <h3 className={styles.product}>{milestone.product}</h3>
              <p className={styles.summary}>{milestone.summary}</p>

              {milestone.url ? (
                <a
                  href={milestone.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Visit product
                  <ArrowRight size={15} weight="bold" aria-hidden />
                </a>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
