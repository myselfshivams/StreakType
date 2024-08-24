import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../styles/EndModal.module.css';

interface ModalProps {
  name: string;
  wpm: number;
  accuracy: number;
  onRetry: () => void;
  onExit: () => void;
  graph?: React.ReactNode;
}

const EndModal: React.FC<ModalProps> = ({ name, wpm, accuracy, onRetry, onExit, graph }) => {
  const [showGraphModal, setShowGraphModal] = useState(false);


  const handleShowGraph = () => {
    setShowGraphModal(true);
  };

  const handleCloseGraphModal = () => {
    setShowGraphModal(false);
  };

  const handleGoHome = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit full screen:", err);
      });
    }
    window.history.back(); 
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Typography variant="h4" gutterBottom>
          Hi, {name}!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your Current Typing Status is:
        </Typography>
        <div className={styles.statsContainer}>
          <Card className={styles.statsBox}>
            <CardContent>
              <Typography variant="h6">WPM</Typography>
              <Typography variant="body1">{wpm}</Typography>
            </CardContent>
          </Card>
          <Card className={styles.statsBox}>
            <CardContent>
              <Typography variant="h6">Accuracy</Typography>
              <Typography variant="body1">{accuracy}%</Typography>
            </CardContent>
          </Card>
        </div>
        <div className={styles.modalActions}>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.success}`}
            onClick={onRetry}
          >
            Start Test
          </Button>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.error}`}
            onClick={handleGoHome} // Use handleGoHome function
          >
            Go to Home
          </Button>
          <Button
            variant="contained"
            className={`${styles.button} ${styles.primary}`}
            onClick={handleShowGraph}
          >
            Show Graph
          </Button>
        </div>
        {showGraphModal && (
          <div className={styles.graphModal}>
            <div className={styles.graphModalContent}>
              <Typography variant="h6" gutterBottom>
                Typing Test Performance
              </Typography>
              {graph}
              <Button
                variant="contained"
                className={`${styles.button} ${styles.secondary}`}
                onClick={handleCloseGraphModal}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndModal;
