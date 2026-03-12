import styles from "./App.module.css";
import FallingFlora from "./components/FallingFlora";

function App() {
  return (
    <section className={styles.page}>
      <FallingFlora />
      <div className={styles.card}>
        <div className={styles.logoWrap} aria-hidden="true">
          <img
            src="/logo.png"
            alt=""
            className={styles.logo}
            width={140}
            height={140}
          />
        </div>
        <p className={styles.status}>Site Update In Progress</p>
        <h1 className={styles.title}>Page Under Construction</h1>
        <p className={styles.description}>
          We are currently rebuilding Lyfie.org. Please check back soon for the
          updated experience.
        </p>
      </div>
    </section>
  );
}

export default App;
