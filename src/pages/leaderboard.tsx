import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles
import styles from '@/styles/Leaderboard.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Certificate {
  score: number;
  id: string;
  name: string;
  accuracy: number;
  wpm: number;
  date: string;  
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleItems, setVisibleItems] = useState<number>(10);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      console.log('Fetching data from Supabase...');
      
      const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
      console.log('Date filter (one month ago):', oneMonthAgo);

      try {
        const { data: responseData, error } = await supabase
          .from('certificates')  
          .select('name, accuracy, wpm')  // Select only the necessary columns
          .gte('wpm', 0)
          .lte('wpm', 100)
          .gte('date', oneMonthAgo) 
          .order('wpm', { ascending: false })  
          .order('accuracy', { ascending: false });  

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        console.log('Fetched data:', responseData);
        if (responseData.length === 0) {
          console.log('No records found matching the criteria.');
        }

        const rankedData = responseData.map((item) => ({
          ...item,
          score: item.wpm + item.accuracy  
        })).sort((a, b) => b.score - a.score);  
        
        // Create a map to store the highest score for each user
        const uniqueDataMap = new Map<string, Certificate>();
        
        rankedData.forEach(item => {
          const certificate: Certificate = {
            id: '',
            date: '',
            ...item
          };
        
          if (!uniqueDataMap.has(item.name) || uniqueDataMap.get(item.name)!.score < item.score) {
            uniqueDataMap.set(item.name, certificate);
          }
        });
        
        // Convert the map values to an array
        const uniqueData = Array.from(uniqueDataMap.values());
        
        setData(uniqueData || []);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => {
      const newVisibleItems = prevVisibleItems + 5;
      return newVisibleItems;
    });
  };

  return (
    <>
    <Head>
        <title>StreakType | Leaderboard</title>
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
      <div className={styles.bgg}>
        <div className={styles.container}>
          <h1 className={styles.title}>🏆 Leaderboard</h1>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Skeleton count={10} height={50} width="100%" />
            </div>
          ) : (
            data.length === 0 ? (
              <p className={styles.noData}>No data available</p>
            ) : (
              <>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Accuracy</th>
                      <th>WPM</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, visibleItems).map((item, index) => (
                      <tr key={item.id} className={`${styles.row} ${index < 3 ? styles.topRank : ''}`}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.accuracy}%</td>
                        <td>{item.wpm} WPM</td>
                        <td>{item.score}</td> 
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visibleItems < data.length && (
                  <button className={styles.loadMore} onClick={handleLoadMore}>
                    Load More
                  </button>
                )}
              </>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;
