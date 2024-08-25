import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/authContext';
import { updateStreak } from '../utils/streak';
import useIsMobile from '../hooks/isMobile';
import MobileWarningModal from '../components/MobileWarningModal';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (isMobile) {
      setShowModal(true); // Show the mobile warning modal
    } else {
      setShowModal(false); // Hide the modal if not mobile
    }
  }, [isMobile]);

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Head>
          <title>Streaktype</title>
          <link rel="icon" href="streaktype.png" />
          <meta name="description" content="Streaktype offers a comprehensive typing test experience with features like personalized passages, random text, performance graphs, streak tracking, and certification upon completion. Enhance your typing skills and showcase your achievements with our detailed analytics." />
          <meta name="keywords" content="typing test, typing certification, WPM graph, typing accuracy, maintain typing streak, random typing passages, personalized typing passages, typing speed, Streaktype, typing practice" />
          <meta property="og:title" content="Streaktype - Typing Test and Certification" />
          <meta property="og:description" content="Streaktype provides a dynamic typing test platform with features like personalized and random passages, performance tracking with graphs, streak maintenance, and certification. Perfect your typing skills and monitor your progress." />
          <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
          <meta property="og:url" content="https://streaktype.studex.tech" />
          <link rel="canonical" href="https://streaktype.studex.tech" />
        </Head>

        <ToastContainer />
        {showModal && <MobileWarningModal />} {/* Show the modal if on a mobile device */}
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
