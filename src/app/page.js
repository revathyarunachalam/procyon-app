import styles from "./page.module.css";
import Home from "./Pages/home";

export default function Main() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
