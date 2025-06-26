import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navItem}>
        COMPETIÇÕES
      </Link>
      <Link to="/import" className={styles.navItem}>
        IMPORTAR
      </Link>
    </nav>
  );
}