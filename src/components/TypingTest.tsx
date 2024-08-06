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
          const response = await axios.get('/api/stories');
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

  return (
    <div className="container">
      <h1>Typing Test</h1>
      <div className="story-container">
        <p>{story}</p>
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
        }
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .results {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default TypingTest;
