'use client'

import styles from "./page.module.css";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Home() {
  const currPathName = usePathname();
  
  return (
    <main className={styles.main} style={{display:'none'}}>
      <Link href={'/vehicles'}>🚕</Link>
      <Link href={'/drivers'}>🧑</Link>
      <Link href={'/transfers'}>⏭️</Link>
    </main>
  );
}
