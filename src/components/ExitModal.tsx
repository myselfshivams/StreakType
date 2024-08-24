import React from 'react';
import styles from '../styles/ExitModal.module.css';

interface ExitConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitModal: React.FC<ExitConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  const handleConfirm = () => {

    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error('Error exiting fullscreen:', err));
    }
    
    window.history.back();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to exit?</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={handleConfirm}>Yes</button>
          <button className={styles.cancelButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
