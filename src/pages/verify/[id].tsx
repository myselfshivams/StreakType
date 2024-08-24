import { useRouter } from 'next/router';
import React from 'react';

const VerifyCertificate: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch data from server if needed using the ID

  return (
    <div>
      <h1>Certificate Verification</h1>
      <p>This certificate with ID <strong>{id}</strong> is verified.</p>
      <p>Details:</p>
      {/* Render the user's details here */}
      <p>Name: John Doe</p>
      <p>WPM: 75</p>
      <p>Accuracy: 95%</p>
      <p>Date: 24/08/2024</p>
    </div>
  );
};

export default VerifyCertificate;
