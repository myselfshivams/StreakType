import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
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
        <Typography variant="h5" gutterBottom>
          Hi, {name}!
        </Typography>
        <Typography variant="body1" gutterBottom>
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
            color="success"
            onClick={onRetry}
            sx={{
              backgroundColor: '#4caf50',
              color: '#fff',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#45a049',
              },
              '&:active': {
                backgroundColor: '#388e3c',
              },
            }}
          >
            Start Test
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onExit}
            sx={{
              backgroundColor: '#f44336',
              color: '#fff',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#e53935',
              },
              '&:active': {
                backgroundColor: '#c62828',
              },
            }}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
