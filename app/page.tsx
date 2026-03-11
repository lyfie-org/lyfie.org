import { Hero } from "@/components/Hero/Hero";
import { JoinUs } from "@/components/JoinUs/JoinUs";
import { Reveal } from "@/components/Motion/Reveal";
import { Roadmap } from "@/components/Roadmap/Roadmap";
import { siteConfig } from "@/lib/constants/site";

import styles from "@/app/page.module.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lyfie",
  legalName: "Lyfie Open Source Organization",
  url: "https://lyfie.org",
  logo: "https://lyfie.org/icon.svg",
  slogan: "Outpace the horizon",
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.founder,
    siteConfig.social.luthor,
    siteConfig.social.papyra
  ],
  founder: {
    "@type": "Person",
    name: "Rahul N. Anand",
    url: siteConfig.social.founder
  },
  description: siteConfig.description,
  knowsAbout: [
    "Open source software",
    "Self-hosted applications",
    "Docker-first developer tooling",
    "Privacy-first product design"
  ]
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Luthor",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows via Docker",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  isAccessibleForFree: true,
  author: {
    "@type": "Organization",
    name: "Lyfie"
  },
  url: siteConfig.social.luthor,
  description:
    "Luthor is Lyfie's flagship Docker-first platform for fast and reliable self-hosted workflows."
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd, softwareJsonLd])
        }}
      />

      <article className={styles.page}>
        <section className={styles.block}>
          <Hero />
        </section>

        <section id="mission" className={styles.block}>
          <Reveal className={styles.mission ?? ""}>
            <p className={styles.kicker}>Why Lyfie Exists</p>
            <h2 className={styles.blockTitle}>
              Open-source products without compromise.
            </h2>
            <p className={styles.lead}>
              We are building an ecosystem that removes paywalls, respects privacy, and
              keeps operations simple through Dockerized deployment. Lyfie is for people
              who want speed, ownership, and elegance without subscription drag.
            </p>
            <div className={styles.points}>
              <article>
                <h3>Docker-first by design</h3>
                <p>
                  Consistent deployments from local to cloud, without brittle setup docs.
                </p>
              </article>
              <article>
                <h3>No lock-in economics</h3>
                <p>
                  Core tools stay fully free and open so teams can build long-term
                  confidence.
                </p>
              </article>
              <article>
                <h3>Privacy as a default</h3>
                <p>
                  No tracking theater. You control your infrastructure and your data path.
                </p>
              </article>
            </div>
          </Reveal>
        </section>

        <section className={styles.block}>
          <Roadmap />
        </section>

        <section className={styles.block}>
          <JoinUs />
        </section>
      </article>
    </>
  );
}
