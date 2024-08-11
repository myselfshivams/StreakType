import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code not provided' });
  }

  try {
    const response = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();
    

    console.log('GitHub Token Exchange Response:', data);

    if (data.access_token) {
      res.status(200).json({ token: data.access_token });
    } else {
      res.status(400).json({ error: 'Failed to get access token' });
    }
  } catch (error) {
    console.error('Error in /api/auth/github:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
