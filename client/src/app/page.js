import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'/vehicles'}>🚕</Link>
      <Link href={'/drivers'}>🧑</Link>
      <Link href={'/transfers'}>⏭️</Link>
    </main>
  );
}
