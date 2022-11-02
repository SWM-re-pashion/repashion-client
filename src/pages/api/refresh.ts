import { NextApiRequest, NextApiResponse } from 'next';

import { TOKEN_REFRESH } from '@constants/api/index';
import { axiosInstance } from 'src/api/core';
import { isAxiosError } from 'src/api/core/error';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, headers: returnedHeaders } =
      await axiosInstance.get<res.reissue>(
        `${process.env.API_URL}${TOKEN_REFRESH}`,
      );
    const { accessToken } = data.data;
    Object.entries(returnedHeaders).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });
    res.setHeader('Set-Cookie', `x-access-token=${accessToken}`);
    res.send(data);
  } catch (err) {
    if (isAxiosError<res.error>(err) && err.response) {
      const { status, data } = err.response;
      res.status(status).json(data);
    }
  }
};
