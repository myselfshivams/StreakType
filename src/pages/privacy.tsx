import { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy: FC = () => {
  return (
    <>
    <Navbar />
      <Head>
        <title>Streaktype - Privacy Policy</title>
        <link rel="icon" href="/streaktype.png" />
        <meta name="description" content="Read Streaktype's Privacy Policy to understand how we handle and protect your personal information while using our platform." />
        <meta name="keywords" content="privacy policy, data protection, user privacy, Streaktype privacy, information security" />
        <meta property="og:title" content="Streaktype - Privacy Policy" />
        <meta property="og:description" content="Learn about Streaktype's commitment to protecting your personal information and how we handle data. Our privacy policy outlines our practices to ensure your information is secure." />
        <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
        <meta property="og:url" content="https://streaktype.studex.tech/privacy" />
        <link rel="canonical" href="https://streaktype.studex.tech/privacy" />
      </Head>
      <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          Privacy Policy
        </header>
        <main className={styles.mainContent}>
          <section className={styles.section}>
            <h2>Introduction</h2>
            <p className={styles.textt}>
              At Streaktype, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Information We Collect</h2>
            <p className={styles.textt}>
              We collect various types of information to provide and improve our services. This includes:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Information you provide when creating an account or using our services, such as your name, email address, and typing test results.</li>
              <li><strong>Usage Data:</strong> Data on how you interact with our platform, including IP addresses, browser types, and pages visited.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track activity and improve user experience.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>How We Use Your Information</h2>
            <p className={styles.textt}>
              We use the collected information to:
            </p>
            <ul>
              <li>Provide and enhance our typing test services.</li>
              <li>Analyze usage and improve the functionality of our platform.</li>
              <li>Send notifications and updates related to your account or our services.</li>
              <li>Ensure the security and integrity of our platform.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Data Security</h2>
            <p className={styles.textt}>
              We implement various security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Third-Party Links</h2>
            <p className={styles.textt}>
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Changes to This Privacy Policy</h2>
            <p className={styles.textt}>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>
        
        </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
