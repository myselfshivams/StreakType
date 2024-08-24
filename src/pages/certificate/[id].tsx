// src/pages/certificate/[id].tsx
import { GetServerSideProps } from 'next';
import supabase from '../../utils/supabase/server';

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

    // Format date here
    const formattedDate = new Date(data.date).toLocaleString();

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

const CertificatePage = ({ unique_id, name, wpm, accuracy, date }: { unique_id: string, name: string, wpm: number, accuracy: number, date: string }) => (
  <div>
    <h1>Certificate</h1>
    <p>Unique ID: {unique_id}</p>
    <p>Name: {name}</p>
    <p>WPM: {wpm}</p>
    <p>Accuracy: {accuracy}</p>
    <p>Date: {date}</p>
  </div>
);

export default CertificatePage;
