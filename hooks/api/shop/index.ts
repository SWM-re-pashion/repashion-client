import { queryKey } from '@constants/react-query';
import { getProductItemList } from 'api/shop';

import { useCoreInfiniteQuery } from '../core';

export const useProductItemListQuery = () => {
  return useCoreInfiniteQuery(
    queryKey.productItemList,
    ({ pageParam = 1 }) => {
      const {
        data: { pagination, items },
      } = getProductItemList();
      return {
        pagination: {
          ...pagination,
          pageNumber: pageParam,
        },
        items,
      };
    },
    {
      getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
        return isEndOfPage ? undefined : pageNumber + 1;
      },
    },
  );
};
