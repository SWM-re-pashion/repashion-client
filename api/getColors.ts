import { ColorData } from '#types/info';
import axios from 'lib/axios';

export type StyleResponse = {
  colors: ColorData[];
};

export const getColors = async (): Promise<StyleResponse> => {
  const { data } = await axios.get<StyleResponse>('/api/colors');
  return data;
};
