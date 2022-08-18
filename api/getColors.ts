import { DefaultData } from '#types/index';
import { Axios } from 'lib/axios';

export type StyleResponse = {
  colors: DefaultData[];
};

export const getColors = async (): Promise<StyleResponse> => {
  const { data } = await Axios.get<StyleResponse>('/api/colors');
  return data;
};
