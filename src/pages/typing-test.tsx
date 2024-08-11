import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../styles/Typingtest.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Modal from '../components/EndModal'; // Import the Modal component
import ExitConfirmationModal from '../components/ExitModal'; // Import the ExitConfirmationModal component

const TypingTest = () => {
  const router = useRouter();
  const { name, difficulty } = router.query;
  const [story, setStory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showExitModal, setShowExitModal] = useState(false); // State to control exit modal visibility
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
    let timerDuration = 60; 

    if (typeof difficulty === 'string') {
      switch (difficulty) {
        case 'easy':
          timerDuration = 180;
          break;
        case 'medium':
          timerDuration = 60;
          break;
        case 'hard':
          timerDuration = 45; 
          break;
        case 'professional':
          timerDuration = 30; 
          break;
        default:
          timerDuration = 60;
          break;
      }
    }

    let intervalId: number;

    const updateTimer = () => {
      if (startTime !== null) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(timerDuration - elapsed, 0);
        setTimer(remaining);
        if (remaining <= 0) {
          clearInterval(intervalId);
          updateWpm(userInput);
          if (!showModal) setShowModal(true); // Show modal when the timer runs out
        } else {
          intervalId = requestAnimationFrame(updateTimer);
        }
      }
    };

    if (startTime === null) {
      setTimer(timerDuration);
    } else {
      intervalId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (intervalId) {
        cancelAnimationFrame(intervalId);
      }
    };
  }, [startTime, userInput, difficulty, showModal]);

  useEffect(() => {
    if (userInput.trim() === story.trim() && !showModal) {
      setShowModal(true); // Show modal when the story is fully typed
    }
  }, [userInput, story, showModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    if (startTime === null) {
      setStartTime(Date.now()); // Start the test when the user starts typing
    }
    updateWpm(input);
    updateAccuracy(input);
  };

  const updateWpm = useCallback((input: string) => {
    if (startTime) {
      const elapsed = (Date.now() - startTime) / 60000; // minutes
      const words = input.trim().split(/\s+/).length;
      setWpm(Math.round(words / elapsed));
    }
  }, [startTime]);

  const updateAccuracy = useCallback((input: string) => {
    const storyWords = story.trim().split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    let correctWords = 0;

    for (let i = 0; i < Math.min(storyWords.length, inputWords.length); i++) {
      if (storyWords[i] === inputWords[i]) {
        correctWords++;
      }
    }

    const accuracy = (correctWords / storyWords.length) * 100;
    setAccuracy(Math.round(accuracy));
  }, [story]);

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

  const enterFullscreen = () => {
    const element = document.documentElement as any; // Use `any` to bypass TypeScript checks
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  };
  
  useEffect(() => {
    enterFullscreen();
  }, []);

  const handleRetry = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setShowModal(false);
    inputRef.current?.focus(); // Refocus input field
  };

  const handleExit = () => {
    router.push('/typing');
  };

  const handleExitConfirmation = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    router.push('/typing');
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <div className={styles.fullscreenContainer}>
      <Head>
        <title>Typing Test</title>
      </Head>
      <div className={styles.typingContainer}>
        <h1 className={styles.heading}>Typing Test Assessment</h1>
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
          <div className={styles.statBox}>
            <div className={styles.statTitle}>WPM</div>
            <div className={styles.statValue}>{wpm}</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statTitle}>Accuracy</div>
            <div className={styles.statValue}>{accuracy}%</div>
          </div>
        </div>
        <button className={styles.exitButton} onClick={handleExitConfirmation}>
          Exit
        </button>
        {showModal && name && (
          <Modal
            name={name as string}
            wpm={wpm}
            accuracy={accuracy}
            onRetry={handleRetry}
            onExit={handleExit}
          />
        )}
        {showExitModal && (
          <ExitConfirmationModal
            onConfirm={handleConfirmExit}
            onCancel={handleCancelExit}
          />
        )}
      </div>
    </div>
  );
};

export default TypingTest;
