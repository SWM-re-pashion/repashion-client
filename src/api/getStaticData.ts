import { useQuery } from '@tanstack/react-query';
import { Axios } from 'src/api/core';

type StaticType =
  | 'color'
  | 'fit'
  | 'gender'
  | 'length'
  | 'size'
  | 'style'
  | 'bodyShape';

export const getStaticData = async <T>(type: StaticType): Promise<T> => {
  const response = await Axios.get(`/api/static/${type}`);
  return response;
};

export const useStaticData = <T>(type: StaticType) => {
  const response = useQuery(['staticData', type], () => getStaticData<T>(type));
  return response;
};
