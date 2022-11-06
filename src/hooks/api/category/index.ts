import { QUERY_DAYTIME, queryKey } from '@constants/react-query';
import { getSelectedCategory } from 'src/api/category';

import { useCoreQuery } from '../core';

export const useCategoryTree = (isExcluded: boolean) => {
  const response = useCoreQuery(
    queryKey.category(isExcluded),
    () => getSelectedCategory(isExcluded),
    {
      staleTime: QUERY_DAYTIME,
      suspense: true,
    },
  );
  return response.data;
};
