import styles from "./page.module.css";
import Leagues from "./ui/Leagues";

export default function Home() {
  return (
    <main className={styles.main}>
      <Leagues
        countryId={"7"}
        year={"2023"}
      />
    </main>
  );
}
