import { DAYTIME, queryKey } from '@constants/react-query';
import { getCategory, getExcludeCategory } from 'api/category';

import { useCoreQuery } from '../core';

export const useCategoryTree = (isExcluded: boolean) => {
  const response = useCoreQuery(
    queryKey.category(isExcluded),
    () => (isExcluded ? getExcludeCategory() : getCategory()),
    {
      cacheTime: DAYTIME,
      staleTime: DAYTIME,
      suspense: true,
    },
  );
  return response.data;
};
