import Head from 'next/head';
import styles from './layout.module.scss';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Pokémon DashBoard</title>
      </Head>
      <div className="container">
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
