import { NavLink } from 'react-router';
import { useAuth } from '../../context/authContext';
import styles from './Header.module.scss';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();

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
        </div>

      </nav>
    </header>
  );
}