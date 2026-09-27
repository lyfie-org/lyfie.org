import styles from "./SiteFooter.module.css";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Documentation",
    links: [
      { href: "#mission", label: "Introduction" },
      { href: "#programs", label: "Installation" },
      { href: "#impact", label: "Organization Guide" },
      { href: "#contact", label: "API and Integrations" }
    ]
  },
  {
    title: "Resources",
    links: [
      { href: "#impact", label: "Demo" },
      { href: "#programs", label: "Features" },
      { href: "#programs", label: "Playground" },
      { href: "https://github.com/", label: "GitHub", external: true }
    ]
  }
];

const FOOTER_NAV_LINKS: FooterLink[] = [
  { href: "#top", label: "Home" },
  { href: "#mission", label: "Docs" },
  { href: "#programs", label: "Features" },
  { href: "#impact", label: "Demo" },
  { href: "https://github.com/", label: "GitHub", external: true }
];

function SiteFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <section className={styles.footerBrandCol} aria-label="About lyfie">
            <a href="#top" className={styles.footerBrandLink}>
              <img
                src="/logo.png"
                alt="lyfie logo"
                className={styles.footerBrandLogo}
                width={40}
                height={40}
              />
              <span className={styles.footerBrand}>lyfie</span>
            </a>
            <p className={styles.footerDescription}>
              A practical website foundation for organizations that want clear
              communication and polished presentation.
            </p>
          </section>

          {FOOTER_SECTIONS.map((section) => (
            <section
              className={styles.footerColumn}
              aria-label={section.title}
              key={section.title}
            >
              <h2 className={styles.footerHeading}>{section.title}</h2>
              <ul className={styles.footerList}>
                {section.links.map(({ href, label, external }) => (
                  <li key={label}>
                    <a
                      className={styles.footerLink}
                      href={href}
                      rel={external ? "noreferrer" : undefined}
                      target={external ? "_blank" : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className={styles.footerColumn} aria-label="Support">
            <h2 className={styles.footerHeading}>Support the Project</h2>
            <div className={styles.footerActions}>
              <a
                className={`${styles.supportButton} ${styles.supportPrimary}`}
                href="https://www.buymeacoffee.com/"
                rel="noreferrer"
                target="_blank"
              >
                Buy me a coffee
              </a>
              <a
                className={styles.supportButton}
                href="https://github.com/"
                rel="noreferrer"
                target="_blank"
              >
                Star on GitHub
              </a>
            </div>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCredit}>
            Built with care by{" "}
            <a className={styles.footerInlineLink} href="#top">
              Lyfie.org
            </a>
          </p>
          <nav className={styles.footerNav} aria-label="Footer links">
            {FOOTER_NAV_LINKS.map(({ href, label, external }) => (
              <a
                className={styles.footerNavLink}
                href={href}
                key={label}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
