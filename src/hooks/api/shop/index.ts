import { queryKey } from '@constants/react-query';
import { getInfiniteProducts, getProductItemList } from 'src/api/shop';

import { useCoreInfiniteQuery } from '../core';

export const useProductItemListQuery = (
  requestParams: Omit<req.ShopFeed, 'page' | 'size'>,
) => {
  return useCoreInfiniteQuery(
    queryKey.productItemList(requestParams),
    getInfiniteProducts({
      queryStringObj: requestParams,
      apiFunc: getProductItemList,
    }),
    {
      getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
        return isEndOfPage ? undefined : pageNumber + 1;
      },
    },
  );
};
