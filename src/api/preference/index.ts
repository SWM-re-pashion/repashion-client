import { Axios } from 'src/api/core';

export const postPreference = async (
  state: req.Preference,
): Promise<res.Preference> => {
  const response = await Axios.post('/api/preference', JSON.stringify(state));
  return response;
};

export const getStyleImgs = async (): Promise<res.StyleImgs> => {
  const response = await Axios.get('/api/style-image');
  return response;
};
