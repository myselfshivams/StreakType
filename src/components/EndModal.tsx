import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [city, setCity] = useState<string>('Unknown');
  const [ipAddress, setIpAddress] = useState<string>('Unknown');

  useEffect(() => {
    // Fetch IP address and city information
    const fetchIpAndCity = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=d52b83005e79b0');
        const data = await response.json();
        setIpAddress(data.ip);
        setCity(data.city);
      } catch (error) {
        console.error('Error fetching IP and city information:', error);
      }
    };

    fetchIpAndCity();
  }, []);

  const handleShowGraph = () => {
    toast.info("Showing graph...");
    setShowGraphModal(true);
  };

  const handleCloseGraphModal = () => {
    setShowGraphModal(false);
  };

  const handleGoHome = () => {
    toast.warn("Redirecting to home...");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit full screen:", err);
      });
    }
    window.location.href = '/';
  };

  const handleGenerateCertificate = async () => {
    if (wpm > 100) {
      toast.error("You have violated test rules by using third Party tools.");
      return;
    }

    if (wpm === 0) {
      toast.error("Start a Test before generating certificate.");
      return;
    }

    const documentId = uuidv4(); // Generate a unique ID for the document
    const date = new Date().toISOString(); // Current date and time

    // Gather additional data
    const deviceType = navigator.userAgent;
    const deviceMemory = (navigator as any).deviceMemory || 'Unknown';
    const screenWidth = window.screen.width || 'Unknown';
    const screenHeight = window.screen.height || 'Unknown';

    let batteryLevel = 'Unknown';
    if ((navigator as any).getBattery) {
      try {
        const battery = await (navigator as any).getBattery();
        batteryLevel = (battery.level * 100).toFixed(0) + '%';
      } catch (error) {
        console.error("Error fetching battery level:", error);
      }
    }

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
            device_type: deviceType,
            device_memory: deviceMemory,
            screen_width: screenWidth,
            screen_height: screenHeight,
            battery_level: batteryLevel,
            city,
            ip_address: ipAddress
          }
        ]);

      if (error) {
        throw error;
      }

      toast.success("Generating certificate...");
      console.log('Certificate data stored with ID:', documentId);

      window.location.href = `/certificate/${documentId}`;
    } catch (error) {
      toast.error("Failed to generate certificate.");
      console.error('Error storing certificate data:', error);
    }
  };

  const handleRetry = () => {
    toast.info("Restarting test...");
    onRetry();
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
            onClick={handleRetry}
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
      <ToastContainer />
    </div>
  );
};

export default EndModal;
