import { useRouter } from 'next/router';
import styles from '@/styles/404.module.css'; // Assuming you will add styles in this file
import Link from 'next/link';

const Custom404: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for is under construction.</p>
      <Link href="/">
        <span className={styles.homeLink}>Go back to the homepage</span>
      </Link>
      <br /> <br />
      <button onClick={() => router.back()} className={styles.backButton}>
        Go Back
      </button>
    </div>
  );
};

export default Custom404;
