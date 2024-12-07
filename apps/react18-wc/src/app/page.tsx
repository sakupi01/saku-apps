import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <a
          href="./csr"
          target="_blank"
          rel="noopener noreferrer"
        >
          CSR
        </a>
        <a
          href="./ssr"
          target="_blank"
          rel="noopener noreferrer"
        >
          SSR
        </a>
        </main>

    </div>
  );
}
