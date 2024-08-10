import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';





export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come Back to the Portal!";
      } else {
        document.title = "StreakType"; 
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    document.title = "StreakType";
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (

        <><Head>
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
    </>
  );
}
