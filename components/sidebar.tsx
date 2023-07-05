import styles from './sidebar.module.scss';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo + " fz-10"}>
          Pokémon Dashboard
          {/* TODO: 製作 LOGO */}
        </div>
        <div className={styles.menu}>
          <Link href="/" className={styles.menuItem}>
            首頁
          </Link>
          <Link href="/pokedex" className={styles.menuItem}>
            Pokédex
          </Link>
          <Link href="/about" className={styles.menuItem}>
            關於我
          </Link>
        </div>
      </header>
    </>
  )
}