"use client";

import { CheckCircle, Copy } from "@phosphor-icons/react";
import { useState } from "react";

import styles from "@/components/DockerDock/DockerDock.module.css";

type DockerDockProps = {
  title: string;
  command: string;
};

export const DockerDock = ({ title, command }: DockerDockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.dock}>
      <div className={styles.bar}>
        <div className={styles.bullets} aria-hidden>
          <span className={styles.red} />
          <span className={styles.yellow} />
          <span className={styles.green} />
        </div>
        <p className={styles.title}>{title}</p>
        <button className={styles.copyButton} type="button" onClick={handleCopy}>
          {copied ? (
            <>
              <CheckCircle size={16} weight="fill" />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} weight="regular" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className={styles.commandScroll}>
        <pre className={styles.commandBlock}>
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
};
