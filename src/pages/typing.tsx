import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Typing.module.css';
import Head from 'next/head';

const Typing = () => {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = 60 - elapsed;
        if (remaining <= 0) {
          clearInterval(interval);
          setTimer(0);
          updateWpm(userInput); // Call updateWpm to calculate WPM
        } else {
          setTimer(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, userInput]);

  const handleStart = () => {
    if (name) {
      fetchStory(name);
      setStartTime(Date.now());
    }
  };

  const fetchStory = async (character: string) => {
    try {
      const response = await fetch(`https://stories.studex.tech/api/stories?character=${character}&random=true`);
      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    updateWpm(input);
    updateAccuracy(input);
  };

  const updateWpm = (input: string) => {
    if (startTime) {
      const elapsed = (Date.now() - startTime) / 60000; // minutes
      const words = input.split(' ').length;
      setWpm(Math.round(words / elapsed));
    }
  };

  const updateAccuracy = (input: string) => {
    const storyWords = story.split(' ');
    const inputWords = input.split(' ');
    let correctWords = 0;

    for (let i = 0; i < Math.min(storyWords.length, inputWords.length); i++) {
      if (storyWords[i] === inputWords[i]) {
        correctWords++;
      }
    }

    const accuracy = (correctWords / storyWords.length) * 100;
    setAccuracy(Math.round(accuracy));
  };

  const renderStory = () => {
    return story.split('').map((char, index) => {
      const inputChar = userInput[index] || '';
      let color = '';

      if (char === inputChar) {
        color = 'green';
      } else if (inputChar && !char.startsWith(inputChar)) {
        color = 'red';
      }

      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  if (startTime === null) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Typing Test</title>
        </Head>
        <div className={styles.startContainer}>
          <h1>Enter Your Name to Start</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className={styles.inputField}
          />
          <button
            className={styles.button}
            onClick={handleStart}
          >
            Start Typing Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Typing Test</title>
      </Head>
      <div className={styles.typingContainer}>
        <div className={styles.timer}>Time Left: {timer}s</div>
        <div className={styles.story}>{renderStory()}</div>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          autoFocus
          className={styles.inputField}
        />
        <div className={styles.stats}>
          <div>WPM: {wpm}</div>
          <div>Accuracy: {accuracy}%</div>
        </div>
      </div>
    </div>
  );
};

export default Typing;
