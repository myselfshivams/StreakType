import { useState, useEffect } from 'react';
import styles from '../styles/Typingtest.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StoryDisplay from '../components/typing-test/StoryDisplay';
import TypingStats from '../components/typing-test/TypingStats';
import Modal from '../components/EndModal';
import ExitConfirmationModal from '../components/ExitModal';
import TypingStatsChart from '../components/TypingStatsChart';
import Timer from '../components/typing-test/Timer';
import FullscreenHandler from '../components/typing-test/FullscreenHandler';

const TypingTest = () => {
  const router = useRouter();
  const { name, difficulty } = router.query;
  const [story, setStory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [wpmData, setWpmData] = useState<number[]>([]);
  const [accuracyData, setAccuracyData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchStory = async () => {
      if (typeof name === 'string') {
        try {
          const response = await fetch(`https://stories.studex.tech/api/stories?character=${name}&random=true&words=180`);
          const data = await response.json();
          setStory(data.story);
        } catch (error) {
          
        }
      }
    };

    fetchStory();
  }, [name]);

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
          updateAccuracy(userInput);
          if (!showModal) setShowModal(true);
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
      setShowModal(true);
    }
  }, [userInput, story, showModal]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (key.length === 1) { // Allow all printable characters including punctuation
        setUserInput((prev) => prev + key);

        if (startTime === null) {
          setStartTime(Date.now());
        }

        updateWpm(userInput + key);
        updateAccuracy(userInput + key);
      } else if (key === 'Backspace') { // Handle backspace
        setUserInput((prev) => prev.slice(0, -1));
        updateWpm(userInput.slice(0, -1));
        updateAccuracy(userInput.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput, startTime]);

  const updateWpm = (input: string) => {
    if (startTime) {
      const elapsed = (Date.now() - startTime) / 60000; // minutes
      const words = input.trim().split(/\s+/).length;
      const currentWpm = Math.round(words / elapsed);
      setWpm(currentWpm);
      setWpmData((prev) => [...prev, currentWpm]);
      setTimeLabels((prev) => [...prev, new Date().toLocaleTimeString()]);
    }
  };

  const updateAccuracy = (input: string) => {
    let correctChars = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === story[i]) {
        correctChars++;
      }
    }

    const currentAccuracy = (correctChars / input.length) * 100;
    setAccuracy(input.length === 0 ? 100 : Math.round(currentAccuracy)); // Ensure accuracy is 100% when input is empty
    setAccuracyData((prev) => [...prev, Math.round(currentAccuracy)]);
  };

  const handleRetry = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setWpmData([]);
    setAccuracyData([]);
    setTimeLabels([]);
    setShowModal(false);
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
      <FullscreenHandler />
      <div className={styles.typingContainer}>
        <h1 className={styles.heading}>Typing Test Assessment</h1>
        <Timer timer={timer} />
        <StoryDisplay story={story} userInput={userInput} />
        <TypingStats wpm={wpm} accuracy={accuracy} />
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
            graph={
              <TypingStatsChart
                wpmData={wpmData}
                accuracyData={accuracyData}
                timeLabels={timeLabels}
              />}
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
