
import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import supabase from '../utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
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
    window.location.href = '/'; 
  };

  const handleGenerateCertificate = async () => {
    const documentId = uuidv4(); // Generate a unique ID for the document
    const date = new Date().toISOString(); // Current date and time

    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([
          {
            unique_id: documentId,
            name,
            wpm,
            accuracy,
            date,
          }
        ]);

      if (error) {
        throw error;
      }

      console.log('Certificate data stored with ID:', documentId);

      window.location.href = `/certificate/${documentId}`;
    } catch (error) {
      console.error('Error storing certificate data:', error);
    }
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
            onClick={handleGoHome}
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
          <Button
            variant="contained"
            className={`${styles.button} ${styles.certificate}`}
            onClick={handleGenerateCertificate}
          >
            Generate Certificate
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
