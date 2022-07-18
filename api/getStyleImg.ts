import axios from 'lib/axios';

export type StyleResponse = {
  styles: { id: number; src: string; alt: string }[];
};

export const getStyleImg = async (): Promise<StyleResponse> => {
  const { data } = await axios.get<StyleResponse>('/api/styles');
  return data;
};
