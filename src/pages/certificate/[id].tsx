import { GetServerSideProps } from 'next';
import supabase from '../../utils/supabase/server';
import styles from '../../styles/CertificatePage.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (typeof id !== 'string') {
    return { notFound: true };
  }

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('unique_id', id)
      .single();

    if (error || !data) {
      console.log(`Document not found for unique_id: ${id}`);
      return { notFound: true };
    }

    console.log(`Fetched data for unique_id: ${id}`, data);

    const formattedDate = new Date(data.date).toLocaleDateString();

    return {
      props: {
        unique_id: data.unique_id || '',
        name: data.name || '',
        wpm: data.wpm || 0,
        accuracy: data.accuracy || 0,
        date: formattedDate || '',
      },
    };
  } catch (error) {
    console.error('Error fetching certificate data:', error);
    return { notFound: true };
  }
};

const CertificatePage = ({
  unique_id,
  name,
  wpm,
  accuracy,
  date,
}: {
  unique_id: string;
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
}) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('certificate');
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: 'l', // Landscape orientation
          unit: 'mm',
          format: [297, 210], // A4 size in landscape
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('certificate.pdf');
      });
    }
  };

  return (
    <div className={styles.container}>
      <div id="certificate" className={styles.certificate}>
        <div className={styles.header}>
       
          <h1>Certificate of Appreciation</h1>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>This is to certify that</p>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.text}>has successfully completed the StreakType typing test with the following results:</p>
          <p className={styles.text}>Words Per Minute (WPM): <strong>{wpm}</strong></p>
          <p className={styles.text}>Accuracy: <strong>{accuracy}%</strong></p>
          <p className={styles.text}>Credential ID: <strong>{unique_id}</strong></p>
          <p className={styles.text}>Date: <strong>{date}</strong></p>
        </div>
        <div className={styles.footer}>
          <p>Issued by</p>
          <p>StreakType Portal</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;
