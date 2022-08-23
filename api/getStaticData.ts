import { useQuery } from 'react-query';

import { Axios } from 'lib/axios';

type StaticType =
  | 'color'
  | 'fit'
  | 'gender'
  | 'length'
  | 'size'
  | 'style'
  | 'bodyShape';

export const getStaticData = async <T>(type: StaticType): Promise<T> => {
  const { data } = await Axios.get(`/api/static/${type}`);
  return data;
};

export const useStaticData = <T>(type: StaticType) => {
  const response = useQuery(['staticData', type], () => getStaticData<T>(type));
  return response;
};
