"use client";

import { CircleHalfTilt } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import styles from "@/components/ThemeToggle/ThemeToggle.module.css";

export const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <motion.span
        key="theme-toggle-icon"
        initial={{ opacity: 0, scale: 0.82, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className={styles.iconWrap}
      >
        <CircleHalfTilt size={20} weight="regular" />
      </motion.span>
      <span className={styles.label}>Theme</span>
    </button>
  );
};
