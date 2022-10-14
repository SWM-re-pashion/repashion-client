import { queryKey } from '@constants/react-query';
import { getSearchingItemList } from 'api/search';
import { getInfiniteProducts } from 'api/shop';

import { useCoreInfiniteQuery } from '../core';

export const useSearchingItemListQuery = (
  requestParams: Omit<req.ShopFeed, 'page' | 'size'>,
) => {
  return useCoreInfiniteQuery(
    queryKey.searchingItemList(requestParams),
    getInfiniteProducts({
      queryStringObj: requestParams,
      apiFunc: getSearchingItemList,
    }),
    {
      getNextPageParam: ({ pagination: { isEndOfPage, pageNumber } }) => {
        return isEndOfPage ? undefined : pageNumber + 1;
      },
    },
  );
};
