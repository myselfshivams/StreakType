import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaInstagram, FaGithub, FaArrowUp, FaFire } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import styles from '@/styles/Footer.module.css';
import { getStreak } from '../utils/streak'; 

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
 
    setStreak(getStreak());
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainRegex = /^(.*@gmail\.com|.*@yahoo\.com|.*@outlook\.com|.*@studex\.tech|.*@echotratech\.com|.*@.*\.edu|.*@.*\.ac\.in)$/i;

    if (!emailRegex.test(email) || !validDomainRegex.test(email)) {
      toast.error('Use a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Subscribed to StreakType Successfully');
        setEmail('');
      } else {
        const { message } = await response.json();
        toast.error(message || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.socialColumn}>
          <h4>Social Links</h4>
          <div className={styles.socialLinks}>
            <a href="mailto:contact@itshivam.me" aria-label="Email">
              <FaEnvelope className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/shivamss.pvt" aria-label="Instagram">
              <FaInstagram className={styles.icon} />
            </a>
            <a href="https://github.com/myselfshivams" aria-label="GitHub">
              <FaGithub className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.pageColumn}>
          <h4>Useful Links</h4>
          <div className={styles.pageLinks}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/typing">Typing Test</Link>
            <Link href="/leaderboard">Leaderboard</Link>
          </div>
        </div>

        <div className={styles.subscribeColumn}>
          <h4>Subscribe Our Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className={styles.privacyLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      
      </div>

     
      <a href="#streak" className={styles.streakButton} aria-label="Streak">
        <FaFire className={styles.fireIcon} />
        <span className={styles.streakNumber}>{streak}</span>
      </a>
    </footer>
  );
};

export default Footer;
