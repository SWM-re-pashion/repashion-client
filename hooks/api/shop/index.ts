import { queryKey } from '@constants/react-query';
import { getInfiniteProducts } from 'api/shop';

import { useCoreInfiniteQuery } from '../core';

export const useProductItemListQuery = (
  requestParams: Omit<req.ShopFeed, 'page' | 'size'>,
) => {
  return useCoreInfiniteQuery(
    queryKey.productItemList(requestParams),
    getInfiniteProducts(requestParams),
    {
      getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
        return isEndOfPage ? undefined : pageNumber + 1;
      },
      suspense: true,
    },
  );
};
