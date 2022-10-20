import { NextApiRequest, NextApiResponse } from 'next';

import { isAxiosError } from 'api/core/error';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const { data, headers: returnedHeaders } = await axios.post<res.OAuth>(
      `${process.env.API_URL}api/auth/login`,
      body,
    );
    Object.entries(returnedHeaders).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });
    res.send(data);
  } catch (err) {
    if (isAxiosError<res.error>(err) && err.response) {
      const { status, data } = err.response;
      res.status(status).json(data);
    }
  }
};
