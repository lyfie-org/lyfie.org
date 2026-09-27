import { useEffect, useState } from "react";
import {
  ArrowSquareOut,
  BookOpen,
  Code,
  GithubLogo,
  List,
  Moon,
  PlayCircle,
  Sun,
  X
} from "@phosphor-icons/react";

import type { Theme } from "../../hooks/useTheme";
import styles from "./Navbar.module.css";

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

type NavItem = {
  href: string;
  label: string;
  icon: typeof PlayCircle;
  external?: boolean;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#impact", label: "Demo", icon: PlayCircle, active: true },
  { href: "#mission", label: "Docs", icon: BookOpen },
  { href: "#programs", label: "Playground", icon: Code, external: true },
  { href: "https://github.com/", label: "GitHub", icon: GithubLogo, external: true }
];

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(min-width: 961px)");
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner} data-menu-open={menuOpen ? "true" : "false"}>
        <a href="#" className={styles.brand} aria-label="lyfie home">
          <img
            src="/logo.png"
            alt="lyfie logo"
            className={styles.brandLogo}
            width={56}
            height={56}
          />
          <p className={styles.brandName}>lyfie</p>
        </a>

        <nav id="primary-navigation" className={styles.toolbar} aria-label="Primary">
          {NAV_ITEMS.map(({ href, label, icon: Icon, external, active }) => (
            <a
              href={href}
              key={label}
              className={`${styles.toolItem} ${active ? styles.toolItemActive : ""}`}
              onClick={closeMenu}
              aria-current={active ? "page" : undefined}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <Icon className={styles.navIcon} size={16} weight="regular" />
              <span>{label}</span>
              {external ? (
                <ArrowSquareOut
                  className={styles.navExternal}
                  size={13}
                  weight="regular"
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
          >
            {isDark ? (
              <Sun className={styles.themeIcon} size={20} weight="duotone" />
            ) : (
              <Moon className={styles.themeIcon} size={20} weight="duotone" />
            )}
          </button>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            {menuOpen ? (
              <X className={styles.menuIcon} size={20} weight="bold" />
            ) : (
              <List className={styles.menuIcon} size={20} weight="bold" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
