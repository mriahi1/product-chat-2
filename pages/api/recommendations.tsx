import type { NextApiRequest, NextApiResponse } from 'next';
import { chatBotConfig } from '@/config';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const externalApiResponse = await fetch(chatBotConfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  if (!externalApiResponse.ok) {
    const errorDetails = await externalApiResponse.json(); // Assuming the response is in JSON format
    console.error("Error from external API:", errorDetails);
    res.status(externalApiResponse.status).json(errorDetails);
    return;
  }

  const data = await externalApiResponse.json();
  res.status(200).json(data);
}