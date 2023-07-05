import Head from 'next/head';
import styles from '../styles/DashBoard.module.scss';
import Layout from '../components/layout';

export default function DashBoard() {
  return (
    <Layout>
      <Head>
        <title>Pokémon DashBoard</title>
      </Head>
      <div className={styles.container}>
        <h1>Body</h1>
      </div>
    </Layout>
  );
}