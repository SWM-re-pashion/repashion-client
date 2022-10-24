import { QUERY_DAYTIME, queryKey } from '@constants/react-query';
import { getCategory, getExcludeCategory } from 'src/api/category';

import { useCoreQuery } from '../core';

export const useCategoryTree = (isExcluded: boolean) => {
  const response = useCoreQuery(
    queryKey.category(isExcluded),
    () => (isExcluded ? getExcludeCategory() : getCategory()),
    {
      cacheTime: QUERY_DAYTIME,
      staleTime: QUERY_DAYTIME,
      suspense: true,
    },
  );
  return response.data;
};
