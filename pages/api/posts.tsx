import type { NextApiRequest, NextApiResponse } from 'next';
import { chatBotConfig } from '@/config';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let API_URL;
  if (process.env.NODE_ENV === 'production') {
    API_URL = chatBotConfig.apiUrl;
  } else if (process.env.NODE_ENV === 'development') {
    API_URL = chatBotConfig.stagingUrl;
  } else if (process.env.NODE_ENV === 'test') {
    API_URL = chatBotConfig.testingUrl;
  }

  const externalApiResponse = await fetch(API_URL + '/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!externalApiResponse.ok) {
    const errorDetails = await externalApiResponse.json();
    console.error("Error from external API:", errorDetails);
    res.status(externalApiResponse.status).json(errorDetails);
    return;
  }

  const data = await externalApiResponse.json();
  res.status(200).json(data);
}