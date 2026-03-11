import Link from "next/link";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react/dist/ssr";

import { DockerDock } from "@/components/DockerDock/DockerDock";
import { Reveal } from "@/components/Motion/Reveal";
import styles from "@/components/Hero/Hero.module.css";

const dockerCommand = `docker run -d \\
  --name luthor \\
  -p 8080:8080 \\
  -v luthor-data:/var/lib/luthor \\
  ghcr.io/lyfie-org/luthor:latest`;

export const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Reveal className={styles.copy ?? ""}>
        <p className={styles.kicker}>
          <Sparkle size={16} weight="fill" aria-hidden />
          Open-source organization for Docker-first products
        </p>

        <h1 id="hero-title" className={styles.title}>
          Fantastic apps. Fully free. Built to outpace the horizon.
        </h1>

        <p className={styles.description}>
          Lyfie crafts polished, self-hosted tools that reject paywalls, lock-in, and
          data-mining business models. We make software feel sharp, private, and
          delightful.
        </p>

        <div className={styles.actions}>
          <Link
            href="https://luthor.fyi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryCta}
          >
            Explore Luthor
            <ArrowUpRight size={16} weight="regular" aria-hidden />
          </Link>

          <Link href="#join" className={styles.secondaryCta}>
            Help us build the future
          </Link>
        </div>
      </Reveal>

      <Reveal className={styles.preview ?? ""} delay={0.08}>
        <div className={styles.previewCard}>
          <p className={styles.previewLabel}>Flagship: Luthor</p>
          <h2 className={styles.previewTitle}>The Docker Dock</h2>
          <p className={styles.previewDescription}>
            One command and your stack is live. Setup should feel like a reward.
          </p>
          <DockerDock title="luthor@docker" command={dockerCommand} />
        </div>
      </Reveal>
    </section>
  );
};
