import { queryKey, QUERY_WEEKTIME } from '@constants/react-query';
import { getStaticData } from 'src/api/staticData';

import { useCoreQuery } from '../core';

export const useStaticData = <T extends res.StaticData | res.KindStaticData>(
  type: req.StaticType,
) => {
  const response = useCoreQuery(
    queryKey.staticData(type),
    () => getStaticData<T>(type),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  return response;
};
