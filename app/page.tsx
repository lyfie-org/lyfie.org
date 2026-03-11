import Link from "next/link";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} id="home">
        <p className={styles.kicker}>Starter Template</p>
        <h1 className={styles.title}>A clean base for your website.</h1>
        <p className={styles.description}>
          This boilerplate ships with a responsive navigation bar, structured
          content sections, and a reusable footer.
        </p>
        <div className={styles.actions}>
          <Link href="/#features" className={styles.primaryAction}>
            Explore features
          </Link>
          <Link href="/#contact" className={styles.secondaryAction}>
            Contact us
          </Link>
        </div>
      </section>

      <section className={styles.section} id="features">
        <h2>Features</h2>
        <ul className={styles.featureList}>
          <li>App Router structure with reusable layout components.</li>
          <li>Responsive navigation links for key website sections.</li>
          <li>Footer with utility links and dynamic copyright year.</li>
        </ul>
      </section>

      <section className={styles.section} id="about">
        <h2>About</h2>
        <p>
          Use this as your starting point for product pages, docs, or marketing
          content.
        </p>
      </section>

      <section className={styles.section} id="contact">
        <h2>Contact</h2>
        <p>Replace this section with your real form or social links.</p>
      </section>
    </div>
  );
}
