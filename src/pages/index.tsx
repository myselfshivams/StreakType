import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/typing');
  };

  return (
    <>
      <Head>
        <title>StreakType | Home</title>
      </Head>
      < Navbar />
    
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Unlock Your Typing Potential<br />
            with Typing Streak!
          </h1>
          <h1 className={styles.stitle}>
            in a click of a button
          </h1>
          <p className={styles.description}>
            Master the Art of Typing with Typing Streak!<br />
            Test your skills, maintain your streak,<br />
            and earn exclusive certificates <br />
            for your speed and consistency.<br />
            Get started for free now!"<br /><br /><br />
          </p>

          <button
            className={styles.tryButton}
            onClick={handleClick}
          >
            Let's Go!
          </button>
          <br /><br />
        </main>
      </div>
      < Footer />
    </>
  );
};

export default Home;
