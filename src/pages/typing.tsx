import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Typing.module.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

const Typing = () => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState(''); 
  const [step, setStep] = useState(1); 
  const router = useRouter();

  const handleStartTest = () => {
    setShowModal(true);
  };

  const handleProceed = () => {
    if (step === 1) {
      setStep(2); 
    } else if (step === 2 && userName.trim()) {
      setShowModal(false);
      router.push(`/typing-test?name=${encodeURIComponent(userName)}&difficulty=${encodeURIComponent(difficulty)}`); // Include difficulty in query params
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>StreakType | Typing Test</title>
        <link rel="icon" href="streaktype.png" />
          <meta name="description" content="Streaktype offers a comprehensive typing test experience with features like personalized passages, random text, performance graphs, streak tracking, and certification upon completion. Enhance your typing skills and showcase your achievements with our detailed analytics." />
          <meta name="keywords" content="typing test, typing certification, WPM graph, typing accuracy, maintain typing streak, random typing passages, personalized typing passages, typing speed, Streaktype, typing practice, studex portal, streaktype studex, streak type, typingstreak, studex typing, typing test studex, studex tech" />
          <meta property="og:title" content="Streaktype - Typing Test and Certification" />
          <meta property="og:description" content="Streaktype provides a dynamic typing test platform with features like personalized and random passages, performance tracking with graphs, streak maintenance, and certification. Perfect your typing skills and monitor your progress." />
          <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
          <meta property="og:url" content="https://streaktype.studex.tech" />
          <link rel="canonical" href="https://streaktype.studex.tech" />
        </Head>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Achieve Typing Excellence <br />
            with Typing Streak!
          </h1>
          <h1 className={styles.stitle}>
            In a Click of a Button
          </h1>
          <p className={styles.description}>
            Master the Art of Typing with Typing Streak!<br />
            Track your speed, accuracy,<br />
            and streaks while earning certificates<br />
            for your milestones. Begin your free typing tests<br />
            and reach new heights!<br />
          </p>
          <button
            className={styles.tryButton}
            onClick={handleStartTest}
          >
            Start Test
          </button>
        </main>
        {showModal && (
          <Modal 
            onClose={handleCloseModal} 
            onProceed={handleProceed}
            step={step}
            userName={userName}
            difficulty={difficulty} 
            setUserName={setUserName}
            setDifficulty={setDifficulty} 
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Typing;
