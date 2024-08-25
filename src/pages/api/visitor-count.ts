

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';


const filePath = path.resolve('./visitorCount.json');

const getVisitorCount = () => {
  try {

    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (error) {

    return 0;
  }
};

const saveVisitorCount = (count: any) => {
  // Write the updated count to the file
  fs.writeFileSync(filePath, JSON.stringify({ count }), 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let visitorCount = getVisitorCount();
    visitorCount += 1; // Increment the visitor count
    saveVisitorCount(visitorCount);

    res.status(200).json({ count: visitorCount });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
