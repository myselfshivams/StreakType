import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomainRegex = /^(.*@gmail\.com|.*@yahoo\.com|.*@outlook\.com|.*@studex\.tech|.*@echotratech\.com|.*@.*\.edu|.*@.*\.ac\.in)$/i;

    if (!emailRegex.test(email) || !validDomainRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
      const { data, error } = await supabase
        .from('subscribers') // Ensure this table exists in your Supabase database
        .insert([{ email }]);

      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
