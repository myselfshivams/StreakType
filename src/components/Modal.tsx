import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Modal.module.css';

interface ModalProps {
  onClose: () => void;
  onProceed: () => void;
  step: number;
  userName: string;
  difficulty: string;
  setUserName: (name: string) => void;
  setDifficulty: (difficulty: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onProceed, step, userName, difficulty, setUserName, setDifficulty }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleProceed = () => {
    if (step === 1 && isAccepted) {
      onProceed();
    } else if (step === 2) {
      onProceed();
    }
  };

  // Handle clicks outside the modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={modalContentRef}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {step === 1 && (
          <>
            <h2>Welcome to the Typing Test!</h2>
            <p>
              Ready to test your typing skills? This test will challenge your speed and accuracy with a 1-minute timer.
            </p>
            <p>
              <strong>Instructions:</strong><br />
              1. Type the text as quickly and accurately as you can.<br />
              2. Your Words Per Minute (WPM) and accuracy will be displayed in real-time.<br />
              3. Choose the difficulty mode that best matches your current typing skills to get the most accurate assessment.<br />
              4. The test screen will occupy the full screen. Use <code>F11</code> to toggle full-screen mode or <code>ESC</code> to exit.
            </p>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="acceptInstructions"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="acceptInstructions" className={styles.checkboxLabel}>
                I accept the given instructions
              </label>
            </div>
            <button onClick={handleProceed} className={styles.submitButton}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Enter Your Details</h2>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                placeholder=" "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.inputField}
              />
              <label htmlFor="name" className={styles.inputLabel}>Enter your name</label>
            </div>
            <div className={styles.inputWrapper}>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={styles.inputField}
              >
                <option value="" disabled>Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="professional">Professional</option>
              </select>
              <label htmlFor="difficulty" className={styles.inputLabel}>Select Difficulty</label>
            </div>
            <p className={styles.fullScreenReminder}>
              If you exit full-screen mode, the test will end.
            </p>
            <button onClick={handleProceed} className={styles.submitButton}>
              Start Test
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
