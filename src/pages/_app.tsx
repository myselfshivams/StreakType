// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/authContext';
import { updateStreak, getStreak } from '../utils/streak';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Update streak on page load
    updateStreak();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come Back to the Portal!";
      } else {
        document.title = "StreakType"; 
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);

    document.title = "StreakType";

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Head>
          <title>Streaktype</title>
          <link rel="icon" href="streaktype.png" />
          <meta name="description" content="Uncover user and system data collected by websites, including IP addresses, device info, and connectivity details." />
          <meta name="keywords" content="User data analytics, website data collection, streaktype, IP tracking, device info insights, web metrics, system tracking, privacy insights, connectivity analysis, web traffic, interaction data" />
          <meta property="og:title" content="streaktype - Uncover Website Data Insights" />
          <meta property="og:description" content="Uncover user and system data collected by websites, including IP addresses, device info, and connectivity details." />
          <meta property="og:image" content="https://streaktype.studex.tech/streaktype" />
          <meta property="og:url" content="https://streaktype.studex.tech" />
          <link rel="canonical" href="https://streaktype.studex.tech" />
        </Head>

        <ToastContainer />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
