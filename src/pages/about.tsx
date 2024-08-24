import { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: FC = () => {
  return (
    <>

      <Head>
        <title>Streaktype | About </title>
        <link rel="icon" href="/streaktype.png" />
        <meta name="description" content="Learn more about Streaktype, the platform that offers a comprehensive typing test experience with features like personalized passages, random text, performance graphs, streak tracking, and certification upon completion." />
        <meta name="keywords" content="typing test, typing certification, WPM graph, typing accuracy, maintain typing streak, random typing passages, personalized typing passages, typing speed, Streaktype, typing practice" />
        <meta property="og:title" content="Streaktype - About Us" />
        <meta property="og:description" content="Discover the features of Streaktype, including personalized typing tests, performance analytics, streak tracking, and certification. Learn how Streaktype helps you improve your typing skills and monitor your progress." />
        <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
        <meta property="og:url" content="https://streaktype.studex.tech/about" />
        <link rel="canonical" href="https://streaktype.studex.tech/about" />
      </Head>
      < Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          About Streaktype
        </header>
        <main className={styles.mainContent}>
          <section className={styles.section}>
            <h2>Welcome to Streaktype</h2>
            <p className={styles.textt}>
              Streaktype is dedicated to providing a top-notch typing test experience. Our platform is designed to help you enhance your typing skills through a variety of features and tools tailored for all skill levels.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Features</h2>
            <ul>
              <li><strong>Personalized Passages:</strong> Create and practice with customized typing passages that match your interests or needs.</li>
              <li><strong>Random Text Generator:</strong> Challenge yourself with a variety of randomly generated typing passages to keep your practice sessions engaging.</li>
              <li><strong>Performance Graphs:</strong> Analyze your typing speed and accuracy with detailed performance graphs and metrics.</li>
              <li><strong>Streak Tracking:</strong> Keep track of your typing streaks and stay motivated to improve your skills consistently.</li>
              <li><strong>Certification:</strong> Receive a certificate upon completing typing tests, showcasing your achievements and progress.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Our Mission</h2>
            <p className={styles.textt}>
              Our mission is to help individuals improve their typing speed and accuracy through an engaging and comprehensive platform. Whether you're a beginner looking to build foundational skills or an experienced typist aiming to refine your speed, Streaktype is here to support your goals.
            </p>
          </section>
        </main>
       
      </div>
      <Footer />
    </>
  );
};

export default About;
