import { Axios } from 'lib/axios';

export type StyleResponse = {
  styles: { id: number; src: string; alt: string }[];
};

export const getStyleImg = async (): Promise<StyleResponse> => {
  const { data } = await Axios.get<StyleResponse>('/api/styles');
  return data;
};
