import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '@/styles/Leaderboard.module.css'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          .select('*')
          .gte('wpm', 0)
          .lte('wpm', 120)
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

        setData(rankedData || []);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  return (
    <>
      <Navbar />
      <div className={styles.bgg}>
        <div className={styles.container}>
          <h1 className={styles.title}>🏆 Leaderboard</h1>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
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
                    {data.slice(0, visibleItems).map((item, index) => {
                      const rank = index + 1; // Rank starts from 1
                      let rankClass = '';

                      if (rank === 1) {
                        rankClass = styles.topRankGold;
                      } else if (rank === 2) {
                        rankClass = styles.topRankSilver;
                      } else if (rank === 3) {
                        rankClass = styles.topRankBronze;
                      }

                      return (
                        <tr key={item.id} className={rankClass}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.accuracy}</td>
                          <td>{item.wpm}</td>
                          <td>{item.score}</td>
                        </tr>
                      );
                    })}
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
