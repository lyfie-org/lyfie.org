import Link from "next/link";

import styles from "@/components/Layout/SiteFooter.module.css";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/lyfie-org"
  },
  {
    label: "Luthor",
    href: "https://luthor.fyi"
  },
  {
    label: "Papyra",
    href: "https://papyra.app"
  },
  {
    label: "Rahul N. Anand",
    href: "https://rahulnsanand.com"
  }
] as const;

export const SiteFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.title}>Lyfie Open Source</p>
          <p className={styles.copy}>Outpace the horizon.</p>
        </div>

        <nav className={styles.links} aria-label="Footer links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
