// components/TypingTest.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const TypingTest = () => {
  const [story, setStory] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="container">
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
      <textarea
        value={userInput}
        onChange={handleChange}
        rows={10}
        cols={80}
        placeholder="Start typing..."
      />
      <div className="results">
        <p>Words Per Minute (WPM): {wpm.toFixed(2)}</p>
        <p>Accuracy: {accuracy.toFixed(2)}%</p>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .story-container {
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 10px;
          background-color: #f9f9f9;
          white-space: pre-wrap;
        }
        .word {
          display: inline-block;
          margin-right: 4px;
        }
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 10px;
        }
        .results {
          margin-top: 10px;
        }
        .purple {
          color: purple;
        }
        .green {
          color: green;
        }
        .red {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default TypingTest;
