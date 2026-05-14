import { Outlet } from 'react-router';
import styles from './Layout.module.scss';
import Header from '../Header/Header';

export default function Layout() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.footer}>© 2026 BookApp</footer>
    </div>
  );
}