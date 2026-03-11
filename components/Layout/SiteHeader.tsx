import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "@/components/Layout/SiteHeader.module.css";

const navLinks = [
  {
    label: "Mission",
    href: "#mission"
  },
  {
    label: "Roadmap",
    href: "#roadmap"
  },
  {
    label: "Contribute",
    href: "#join"
  },
  {
    label: "Luthor",
    href: "https://luthor.fyi",
    external: true
  }
] as const satisfies ReadonlyArray<{
  label: string;
  href: string;
  external?: boolean;
}>;

export const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandDot} aria-hidden>
            L
          </span>
          <span className={styles.brandText}>LYFIE</span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              {...("external" in link && link.external
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }
                : {})}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
