import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const GITHUB_REDIRECT_URL = process.env.GITHUB_REDIRECT_URL!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;

    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: GITHUB_REDIRECT_URL,
        }),
      });

      const data = await response.json();

      console.log('GitHub response:', data); 

      if (response.ok && data.access_token) {
        res.status(200).json({ token: data.access_token });
      } else {
        res.status(400).json({ message: 'Authentication failed', details: data });
      }
    } catch (error) {
      console.error('Error during authentication:', error); 
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
