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
        <link rel="icon" href="streaktype.png" />
          <meta name="description" content="Streaktype offers a comprehensive typing test experience with features like personalized passages, random text, performance graphs, streak tracking, and certification upon completion. Enhance your typing skills and showcase your achievements with our detailed analytics." />
          <meta name="keywords" content="typing test, typing certification, WPM graph, typing accuracy, maintain typing streak, random typing passages, personalized typing passages, typing speed, Streaktype, typing practice, studex portal, streaktype studex, streak type, typingstreak, studex typing, typing test studex, studex tech" />
          <meta property="og:title" content="Streaktype - Typing Test and Certification" />
          <meta property="og:description" content="Streaktype provides a dynamic typing test platform with features like personalized and random passages, performance tracking with graphs, streak maintenance, and certification. Perfect your typing skills and monitor your progress." />
          <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
          <meta property="og:url" content="https://streaktype.studex.tech" />
          <link rel="canonical" href="https://streaktype.studex.tech" />
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
