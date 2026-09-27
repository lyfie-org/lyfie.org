import styles from "./HomePage.module.css";

const SECTIONS = [
  {
    id: "mission",
    title: "Mission",
    description: "Introduce your organization and define the core purpose."
  },
  {
    id: "programs",
    title: "Programs",
    description: "List initiatives, services, and current focus areas."
  },
  {
    id: "impact",
    title: "Impact",
    description: "Share outcomes, reports, and transparent performance metrics."
  }
] as const;

const READINESS_ITEMS = [
  "Mission-first messaging blocks",
  "Program pages ready for content handoff",
  "Impact section prepared for transparent reporting"
] as const;

function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.sectionInner}>
          <div className={styles.heroCard}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Purpose-driven digital presence</p>
              <h1 className={styles.title}>
                A focused, modern website for your organization.
              </h1>
              <p className={styles.description}>
                Clear structure, elegant spacing, and responsive sections so the site
                feels production-ready from day one.
              </p>
              <div className={styles.actions}>
                <a href="#programs" className={styles.primaryAction}>
                  Explore Programs
                </a>
                <a href="#mission" className={styles.secondaryAction}>
                  Read Mission
                </a>
              </div>
            </div>
            <aside className={styles.heroMeta} aria-label="Site readiness overview">
              <p className={styles.metaLabel}>Launch Readiness</p>
              <ul className={styles.metaList}>
                {READINESS_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionLead}>
            <h2>Core Website Sections</h2>
            <p>
              A concise structure that helps teams publish quickly while staying clear and
              credible.
            </p>
          </div>
          <div className={styles.grid} aria-label="Website sections">
            {SECTIONS.map(({ id, title, description }) => (
              <article className={styles.panel} id={id} key={id}>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
