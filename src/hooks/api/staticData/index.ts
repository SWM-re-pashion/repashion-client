import { queryKey } from '@constants/react-query';
import { getStaticData } from 'src/api/staticData';

import { useCoreQuery } from '../core';

export const useStaticData = <T>(type: req.StaticType) => {
  const response = useCoreQuery(queryKey.staticData(type), () =>
    getStaticData<T>(type),
  );
  return response;
};
