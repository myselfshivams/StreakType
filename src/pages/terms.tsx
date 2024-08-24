import { FC } from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService: FC = () => {
  return (
    <>
      <Head>
        <title>Streaktype - Terms of Service</title>
        <link rel="icon" href="/streaktype.png" />
        <meta name="description" content="Read Streaktype's Terms of Service to understand the rules and guidelines for using our platform. By accessing or using Streaktype, you agree to comply with these terms." />
        <meta name="keywords" content="terms of service, user agreement, Streaktype terms, platform rules, usage guidelines" />
        <meta property="og:title" content="Streaktype - Terms of Service" />
        <meta property="og:description" content="Review Streaktype's Terms of Service to understand the legal agreement governing the use of our platform. Ensure compliance with our guidelines and rules." />
        <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
        <meta property="og:url" content="https://streaktype.studex.tech/terms" />
        <link rel="canonical" href="https://streaktype.studex.tech/terms" />
      </Head>
      <Navbar />
      <div className={styles.bg}>
      <div className={styles.container}>
        <header className={styles.header}>
          Terms of Service
        </header>
        <main className={styles.mainContent}>
          <section className={styles.section}>
            <h2>Introduction</h2>
            <p className={styles.textt}>
              Welcome to Streaktype. These Terms of Service ("Terms") govern your use of our platform and services. By accessing or using Streaktype, you agree to comply with and be bound by these Terms.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Account Responsibilities</h2>
            <p className={styles.textt}>
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Use of Services</h2>
            <p className={styles.textt}>
              You agree to use our services in accordance with all applicable laws and regulations. You shall not engage in any activity that disrupts or interferes with the functionality of our platform.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Prohibited Activities</h2>
            <p className={styles.textt}>
              You may not use our services to:
            </p>
            <ul>
              <li>Engage in unlawful or fraudulent activities.</li>
              <li>Transmit harmful or malicious content.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
              <li>Violate any intellectual property rights.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Intellectual Property</h2>
            <p className={styles.textt}>
              All content and materials provided on our platform are the property of Streaktype or its licensors. You may not use, reproduce, or distribute any content without our express written permission.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Limitation of Liability</h2>
            <p className={styles.textt}>
              To the fullest extent permitted by law, Streaktype shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Changes to Terms</h2>
            <p className={styles.textt}>
              We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our services constitutes your acceptance of any changes.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Termination</h2>
            <p className={styles.textt}>
              We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, if you violate these Terms or engage in any prohibited activities.
            </p>
          </section>
         
        </main>
       
      </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
