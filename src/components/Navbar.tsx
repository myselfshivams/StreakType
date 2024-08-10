import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoText}>StreakType</span>
        </div>
        <button onClick={toggleMenu} className={styles.menuButton}>
          ☰
        </button>
        <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/typing">Typing Test</Link>
          <Link href="/docs">Documentation</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
