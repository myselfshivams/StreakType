import React, { useEffect } from 'react';

const FullscreenHandler: React.FC = () => {
  useEffect(() => {

    const enterFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    };


    enterFullscreen();

    return () => {

      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, []);

  return null;
};

export default FullscreenHandler;
