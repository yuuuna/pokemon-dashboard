import Head from 'next/head';
import styles from './Layout.module.scss';
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
        <link rel="icon" href="PokemonDashboard.ico" />
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
