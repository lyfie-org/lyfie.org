import Link from "next/link";

import styles from "./SiteHeader.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#security", label: "Security" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About Us" }
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoWrap}>
            <span className={styles.logoGlyph} aria-hidden="true" />
          </span>
          <span>Papyra</span>
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${
                    index === 0 ? styles.navLinkActive : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/#signin" className={styles.signIn}>
            Sign In
          </Link>
          <Link href="/#start" className={styles.startNow}>
            Start Now
          </Link>
        </div>
      </div>
    </header>
  );
}
