// pages/mobile-not-supported.tsx
import React from 'react';

const MobileNotSupported = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Access Restricted on Mobile Devices</h1>
      <p>
        This site includes proctoring and plagiarism detection features designed for desktop use. 
        For assessments or tests, please access the site from a desktop or laptop computer.
      </p>
      <p>
        If you need further assistance or have any questions, please contact our support team.
      </p>
      <p>
        <a href="mailto:contact@itshivam.me" style={{ color: '#0070f3' }}>Contact Support</a>
      </p>
    </div>
  );
};

export default MobileNotSupported;
