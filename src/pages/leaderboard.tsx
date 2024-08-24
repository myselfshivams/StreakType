import React, { ReactNode, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '@/styles/Leaderboard.module.css'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Certificate {
  score: ReactNode;
  id: string;
  name: string;
  accuracy: number;
  wpm: number;
  date: string;  
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className={styles.bgg}>
    <div className={styles.container}>
      <h1 className={styles.title}>🏆 Leaderboard - Last Month 🏆</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        data.length === 0 ? (
          <p className={styles.noData}>No data available</p>
        ) : (
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
              {data.map((item, index) => (
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
        )
      )}
    </div>
    </div>
  );
};

export default Leaderboard;
