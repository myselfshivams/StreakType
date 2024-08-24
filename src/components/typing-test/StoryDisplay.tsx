import React from 'react';
import styles from '../../styles/Typingtest.module.css';

interface StoryDisplayProps {
  story: string;
  userInput: string;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, userInput }) => {
  return (
    <div className={styles.storyDisplay}>
      {story.split('').map((char, index) => {
        const inputChar = userInput[index] || '';
        let color = '';

        if (char === inputChar) {
          color = 'green'; // Correct character
        } else if (inputChar && !char.startsWith(inputChar)) {
          color = 'red'; // Incorrect character
        }

        return (
          <span key={index} style={{ color }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default StoryDisplay;
