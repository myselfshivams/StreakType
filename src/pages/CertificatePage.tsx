import { useRouter } from 'next/router';
import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const CertificatePage: React.FC = () => {
  const router = useRouter();
  const { name, wpm, accuracy, time, date, id } = router.query;

  const handleDownload = () => {
    const element = document.getElementById('certificate');
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <div id="certificate">
      <h1>Certificate of Completion</h1>
      <p>This certifies that <strong>{name}</strong> has successfully completed the typing test.</p>
      <p>WPM: {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <p>Time: {time} seconds</p>
      <p>Date: {date}</p>
      <p>Unique ID: {id}</p>
      <a href={`/verify/${id}`}>Verify Certificate</a>
      <button onClick={handleDownload}>Download Certificate</button>
    </div>
  );
};

export default CertificatePage;
