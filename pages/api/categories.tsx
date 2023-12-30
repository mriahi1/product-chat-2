import type { NextApiRequest, NextApiResponse } from 'next';
import { chatBotConfig } from '@/config';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const API_URL = process.env.NODE_ENV === 'production' ? chatBotConfig.apiUrl : chatBotConfig.stagingUrl;

  const externalApiResponse = await fetch(API_URL + '/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  // console.log("externalApiResponse", externalApiResponse)

  if (!externalApiResponse.ok) {
    const errorDetails = await externalApiResponse.json(); // Assuming the response is in JSON format
    console.error("Error from external API:", errorDetails);
    res.status(externalApiResponse.status).json(errorDetails);
    return;
  }

  const data = await externalApiResponse.json();
  res.status(200).json(data);
}