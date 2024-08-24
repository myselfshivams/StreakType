import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '@/styles/Leaderboard.module.css'; // Ensure you create this CSS file for styling

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Certificate {
  id: string;
  name: string;
  accuracy: number;
  wpm: number;
  date: string;  // Ensure this field matches the column name in your Supabase table
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      console.log('Fetching data from Supabase...');
      
      // Get the date for one month ago
      const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
      console.log('Date filter (one month ago):', oneMonthAgo);

      try {
        const { data: responseData, error } = await supabase
          .from('certificates')  // Table name
          .select('*')
          .gte('wpm', 0)
          .lte('wpm', 120)
          .gte('date', oneMonthAgo)  // Use the correct column name
          .order('accuracy', { ascending: false });  // Update column name here

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        console.log('Fetched data:', responseData);
        if (responseData.length === 0) {
          console.log('No records found matching the criteria.');
        }

        setData(responseData || []);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Leaderboard - Last Month</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Accuracy</th>
                <th>WPM</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.accuracy}</td>
                  <td>{item.wpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default Leaderboard;
