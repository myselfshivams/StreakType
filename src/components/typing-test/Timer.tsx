import React from 'react';
import styles from '../../styles/Typingtest.module.css';

interface TimerProps {
  timer: number;
}

const Timer: React.FC<TimerProps> = ({ timer }) => {
  return (
    <div className={styles.timer}>
      Time Remaining: {timer} seconds
    </div>
  );
};

export default Timer;
