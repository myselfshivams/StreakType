import { GetServerSideProps } from 'next';
import Head from 'next/head';
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
   
      return { notFound: true };
    }



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

      
        const url = `https://streaktype.studex.tech/certificate/${unique_id}`;
        pdf.setFontSize(8);
        pdf.text('', 10, pdfHeight - 10);
        pdf.text(url, 10, pdfHeight - 3);

     
        const filename = `Certificate-${name.replace(/\s+/g, '-')}.pdf`;
        pdf.save(filename);
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Certificate of Appreciation - {name}</title>
        <meta name="description" content={`Certificate of Appreciation for ${name} with WPM: ${wpm} and Accuracy: ${accuracy}%`} />
        <meta property="og:title" content={`Certificate of Appreciation - ${name}`} />
        <meta property="og:description" content={`Certificate of Appreciation for ${name} with WPM: ${wpm} and Accuracy: ${accuracy}%`} />
        <meta property="og:image" content="https://streaktype.studex.tech/streaktype.png" />
        <meta property="og:url" content={`https://streaktype.studex.tech/certificate/${unique_id}`} />
      </Head>
      <div id="certificate" className={styles.certificate}>
        <div className={styles.header}>
          <h1>Certificate of Appreciation</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.nameContainer}>
            <span className={styles.text}>This is to certify that</span>
            <h3 className={styles.name}>{name}</h3>
            <span className={styles.text}>has successfully completed the StreakType typing test with the following results:</span>
          </div>
          <div className={styles.results}>
            <div className={styles.resultBox}>
              Words Per Minute (WPM): <strong>{wpm}</strong>
            </div>
            <div className={styles.resultBox}>
              Accuracy: <strong>{accuracy}%</strong>
            </div>
          </div>
          <div className={styles.text1}>Credential ID: <strong>{unique_id}</strong></div>
        </div>
        <div className={styles.footer}>
          <p>Issued by</p>
          <p>StreakType Portal</p>
        </div>
        <div className={styles.date}>
          <p>Date:<strong> {date}</strong></p>
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
