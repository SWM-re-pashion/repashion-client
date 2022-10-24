import { Axios } from 'src/api/core';

export const getStaticData = async <T>(type: req.StaticType): Promise<T> => {
  const response = await Axios.get(`/api/statics/${type}`);
  return response;
};
