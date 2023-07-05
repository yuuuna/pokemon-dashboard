import Footer from './footer';
import styles from './layout.module.scss';
import Sidebar from './sidebar';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
