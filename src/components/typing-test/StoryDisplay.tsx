import React from 'react';
import styles from '../../styles/Typingtest.module.css';

interface StoryDisplayProps {
  story: string;
  userInput: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, userInput }) => {
  const cursorIndex = userInput.length - 1; 

  return (
    <div className={styles.storyDisplay}>
      {story.split('').map((char, index) => {
        const inputChar = userInput[index] || '';
        let color = '';

        if (index < userInput.length) {
          if (char === inputChar) {
            color = 'green'; 
          } else {
            color = 'red'; 
          }
        } else {
          color = 'white'; 
        }

        return (
          <span
            key={index}
            className={styles.character}
            style={{ color: color }}
          >
            {char}
            {index === cursorIndex && (
              <span className={styles.cursor}></span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StoryDisplay;
