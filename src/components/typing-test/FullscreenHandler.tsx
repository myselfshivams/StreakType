import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullscreenHandler: React.FC = () => {
  const router = useRouter();

  useEffect(() => {

    const enterFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    };


    const endTest = () => {
      toast.warn('You have violated the test rules by exiting fullscreen mode. Redirecting you out of the test now."', {
        position: 'top-center',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        router.push('/typing');
      }, 3000); 
    };

 
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        endTest();
      }
    };


    enterFullscreen();


    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {

      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, [router]); 

  return null;
};

export default FullscreenHandler;
