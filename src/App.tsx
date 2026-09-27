import styles from "./App.module.css";
import FallingFlora from "./components/FallingFlora";
import Navbar from "./components/layout/Navbar";
import SiteFooter from "./components/layout/SiteFooter";
import { useTheme } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.page} id="top">
      <FallingFlora />
      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme((activeTheme) => (activeTheme === "light" ? "dark" : "light"))
        }
      />
      <main className={styles.main}>
        <HomePage />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
