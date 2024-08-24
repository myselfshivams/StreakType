import { useRouter } from 'next/router';
import React from 'react';

const CertificatePage: React.FC = () => {
  const router = useRouter();
  const { name, wpm, accuracy, time, date, id } = router.query;

  const handleDownload = () => {
    // Logic to download the certificate as PDF
  };

  return (
    <div>
      <h1>Certificate of Completion</h1>
      <p>This certifies that <strong>{name}</strong> has successfully completed the typing test.</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Time: {time} seconds</p>
      <p>Date: {date}</p>
      <p>Unique ID: {id}</p>
      <a href={`/verify/${id}`}>Verify Certificate</a> {/* Verification link */}
      <button onClick={handleDownload}>Download Certificate</button>
    </div>
  );
};

export default CertificatePage;
