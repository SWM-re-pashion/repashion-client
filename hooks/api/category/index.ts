import { queryKey } from '@constants/react-query';
import { getCategory, getExcludeCategory } from 'api/category';

import { useCoreQuery } from '../core';

export const useCategoryTree = (isExcluded: boolean) => {
  const response = useCoreQuery(
    queryKey.category(isExcluded),
    () => (isExcluded ? getExcludeCategory() : getCategory()),
    {
      suspense: true,
    },
  );
  return response.data;
};
