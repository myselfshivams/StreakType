import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Modal from './LoginModal';
import { useAuth } from '../context/authContext';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          {token ? (
            <div className={styles.userContainer}>
              <button className={styles.buttonef} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className={styles.buttonef} onClick={openModal}>
              Login
            </button>
          )}
        </div>
      
      </nav>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
