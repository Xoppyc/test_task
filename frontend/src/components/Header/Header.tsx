import { NavLink } from 'react-router';
import { useAuth } from '../../context/authContext';
import styles from './Header.module.scss';
import { LogOut, Moon } from 'lucide-react';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();

  const handleTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark')
    } else if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoStub} />
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/books"
          className={({ isActive }) => isActive ? styles.activeLink : styles.link}
        >
          Books
        </NavLink>
        {isAdmin &&
          <NavLink
            to="/users"
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Users
          </NavLink>
        }
        <div className={styles.profileWrap}>
          <button onClick={logout} className={styles.logoutBtn}>
            <LogOut />
          </button>
          <div className={styles.userBadge}>
            {user?.name || 'user'}
          </div>
          <button onClick={() => handleTheme()}>
            <Moon width={15} />
          </button>
        </div>

      </nav>
    </header>
  );
}