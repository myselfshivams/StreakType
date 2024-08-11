import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Typingtest.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

const TypingTest = () => {
  const router = useRouter();
  const { name } = router.query;
  const [story, setStory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (typeof name === 'string') {
        try {
          const response = await fetch(`https://stories.studex.tech/api/stories?character=${name}&random=true`);
          const data = await response.json();
          setStory(data.story);
        } catch (error) {
          console.error('Error fetching story:', error);
        }
      }
    };

    fetchStory();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        router.push('/'); 
      }
    };

    const handleF11 = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        document.exitFullscreen?.(); 
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleF11);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleF11);
    };

  }, [name, router]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = 60 - elapsed;
        if (remaining <= 0) {
          clearInterval(interval);
          setTimer(0);
          updateWpm(userInput);
        } else {
          setTimer(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, userInput]);

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

  const startTest = () => {
    setStartTime(Date.now());
  };

  return (
    <div className={styles.fullscreenContainer}>
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
        <button className={styles.exitButton} onClick={() => router.push('/')}>
          Exit
        </button>
        {!startTime && <button className={styles.startButton} onClick={startTest}>Start Test</button>}
      </div>
    </div>
  );
};

export default TypingTest;
