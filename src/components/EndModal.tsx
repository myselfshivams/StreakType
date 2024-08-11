import React from 'react';
import styles from '../styles/EndModal.module.css';

interface ModalProps {
  name: string;
  wpm: number;
  accuracy: number;
  onRetry: () => void;
  onExit: () => void;
}

const Modal: React.FC<ModalProps> = ({ name, wpm, accuracy, onRetry, onExit }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Hi, {name}!</h2>
        <p>Your Current Typing Status is:</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {accuracy}%</p>
        <div className={styles.modalActions}>
          <button onClick={onRetry}>Start Test</button>
          <button onClick={onExit}>Go to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
