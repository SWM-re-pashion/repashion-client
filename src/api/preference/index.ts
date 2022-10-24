import { Axios } from 'src/api/core';

export const postPreference = async (
  state: req.Preference,
): Promise<res.Preference> => {
  const response = await Axios.post('/api/preference', JSON.stringify(state));
  return response;
};
