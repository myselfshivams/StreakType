import { useState, useEffect } from 'react';
import axios from 'axios';

const TypingTest = () => {
  const [story, setStory] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [testStarted, setTestStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get('https://stories.studex.tech/api/stories?random=true');
        setStory(response.data.story);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, []);

  useEffect(() => {
    if (isTyping && userInput.length > 0 && startTime) {
      const elapsedTime = (Date.now() - startTime) / 60000; // time in minutes
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(wordsTyped / elapsedTime);

      const correctWords = userInput.trim().split(/\s+/).filter((word, index) => word === story.split(/\s+/)[index]).length;
      setAccuracy((correctWords / story.split(/\s+/).length) * 100);
    }
  }, [userInput, isTyping]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTyping) {
      setIsTyping(true);
      setStartTime(Date.now());
    }
    setUserInput(event.target.value);
  };

  const getTextColor = (index: number) => {
    const userWords = userInput.trim().split(/\s+/);
    const storyWords = story.trim().split(/\s+/);
    if (index >= userWords.length) return 'purple'; // Purple if no user input yet
    return userWords[index] === storyWords[index] ? 'green' : 'red';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Enter') {
        setTestStarted(true);
        enterFullscreen();
        document.querySelector('input.hidden-input')?.focus(); // Focus on the hidden input field
      }
    };

    const preventCopyPaste = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'v')) {
        e.preventDefault();
      }
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Exit fullscreen mode if fullscreen is exited
        setTestStarted(false);
        document.querySelector('input.hidden-input')?.blur(); // Remove focus from the hidden input field
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', preventCopyPaste);
    window.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', preventCopyPaste);
      window.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  return (
    <div className={`container ${testStarted ? 'test-started' : ''}`}>
      <h1>Typing Test</h1>
      <div className="story-container">
        {story.split(/\s+/).map((word, index) => (
          <span
            key={index}
            className={`word ${userInput.split(/\s+/)[index] ? getTextColor(index) : ''}`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        autoFocus
        placeholder="Start typing..."
        className="hidden-input"
        disabled={!testStarted}
      />
      <div className="results">
        <p>Words Per Minute (WPM): {wpm.toFixed(2)}</p>
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #333;
          color: #f9f9f9;
          overflow: hidden;
        }
        .story-container {
          border: 1px solid #555;
          padding: 10px;
          margin-bottom: 10px;
          background-color: #222;
          white-space: pre-wrap;
          overflow-y: auto;
          max-height: 80vh; /* Limit height to fit within viewport */
          width: 90vw; /* Adjust width as needed */
        }
        .word {
          display: inline-block;
          margin-right: 4px;
        }
        input.hidden-input {
          position: absolute;
          top: -1000px; /* Hide the input field */
          left: -1000px;
        }
        .results {
          margin-top: 10px;
        }
        .purple {
          color: #aaa;
        }
        .green {
          color: #0f0;
        }
        .red {
          color: #f00;
        }
      `}</style>
    </div>
  );
};

export default TypingTest;
