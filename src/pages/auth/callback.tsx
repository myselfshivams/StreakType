import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import BeatLoader from 'react-spinners/BeatLoader';

const Callback = () => {
  const router = useRouter();
  const { code } = router.query;
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (typeof code === 'string') {
        try {
          const response = await fetch('/api/auth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Authentication failed');
          }

          const data = await response.json();
          login(data.token); // Set the token
          router.push('/'); // Redirect to home
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    handleAuthCallback();
  }, [code, login, router]);

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.spinnerContainer}>
          <BeatLoader color="#6c5ce7" size={30} /> 
        </div>
      ) : error ? (
        <p style={styles.errorText}>Error: {error}</p>
      ) : (
        <p style={styles.redirectingText}>Redirecting...</p>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background-color: #000;
        }

        .spinnerContainer {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .errorText {
          color: #ff0000; 
        }

        .redirectingText {
          color: #fff; 
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff0000',
  },
  redirectingText: {
    color: '#fff',
  },
};

export default Callback;
