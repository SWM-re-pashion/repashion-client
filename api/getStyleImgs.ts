import { useQuery } from '@tanstack/react-query';
import { Axios } from 'api/core';

export const getStyleImgs = async (): Promise<res.StyleImgs> => {
  return await Axios.get('/api/style-image');
};

export const useStyleImgs = () => {
  const response = useQuery(['styleImg'], getStyleImgs);
  return response;
};
