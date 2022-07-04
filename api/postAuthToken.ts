import axios from 'lib/axios';

export const postAuthToken = async (token: string): Promise<string> => {
  const { data } = await axios.post<string>(`/`, token);
  return data;
};
