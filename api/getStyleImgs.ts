import { useQuery } from '@tanstack/react-query';
import { Axios } from 'api/core';

export const getStyleImgs = async (): Promise<res.StyleImgs> => {
  const response = await Axios.get('/api/style-image');
  return response;
};

export const useStyleImgs = () => {
  const response = useQuery(['styleImg'], getStyleImgs);
  return response;
};
