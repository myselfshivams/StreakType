import React from 'react';
import styles from '../../styles/Typingtest.module.css';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
}

const TypingStats: React.FC<TypingStatsProps> = ({ wpm, accuracy }) => {
  return (
    <div className={styles.stats}>
            <div className={styles.statBox}>
                <div className={styles.statTitle}>WPM</div>
                <div className={styles.statValue}> {wpm}</div>
            </div>
            <div className={styles.statBox}>
                <div className={styles.statTitle}> Accuracy:</div>
                <div className={styles.statValue}> {accuracy}%</div>
            </div>
    </div>
  );
};

export default TypingStats;
