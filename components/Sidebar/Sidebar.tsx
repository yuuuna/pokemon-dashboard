import Image from 'next/image';
import styles from './Sidebar.module.scss';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <header className={styles.header}>
        <Link href='/' className={styles.logo + " fz-10"}>
          <Image src="/images/PokemonDashboard-logo.png" alt="PokemonDashboard-logo" width={370} height={50} />
          {/* TODO: 製作 LOGO */}
        </Link>
        <div className={styles.menu}>
          {/* <Link href="/" className={styles.menuItem}>
            首頁
          </Link> */}
          <Link href="/" className={styles.menuItem}>
            Pokédex
          </Link>
          <Link href="/items" className={styles.menuItem}>
            Items
          </Link>
          {/* <Link href="/about" className={styles.menuItem}>
            關於我
          </Link> */}
        </div>
      </header>
    </>
  )
}