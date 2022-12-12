import { AxiosResponse } from 'axios';
import { Axios } from 'src/api/core';

export const getStaticData = async <
  T extends res.StaticData | res.KindStaticData,
>(
  type: req.StaticType,
): Promise<T> => {
  const response = await Axios.get<T, AxiosResponse<T, any>['data']>(
    `/api/statics/${type}`,
  );
  return response;
};
