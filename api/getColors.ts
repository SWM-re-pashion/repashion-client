import { DefaultData } from '#types/index';
import axios from 'lib/axios';

export type StyleResponse = {
  colors: DefaultData[];
};

export const getColors = async (): Promise<StyleResponse> => {
  const { data } = await axios.get<StyleResponse>('/api/colors');
  return data;
};
