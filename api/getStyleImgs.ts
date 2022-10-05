import { useQuery } from '@tanstack/react-query';
import { Axios } from 'lib/axios';

export const getStyleImgs = async (): Promise<res.StyleImgs> => {
  const { data } = await Axios.get<res.StyleImgs>('/api/style-image');
  return data;
};

export const useStyleImgs = () => {
  const response = useQuery(['styleImg'], getStyleImgs);
  return response;
};
