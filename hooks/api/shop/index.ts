import { queryKey } from '@constants/react-query';
import { getProductItemList } from 'api/shop';
import { getQueryString } from 'utils';

import { useCoreInfiniteQuery } from '../core';

export const useProductItemListQuery = (
  requestParams: Omit<req.ShopFeed, 'page' | 'size'>,
) => {
  return useCoreInfiniteQuery(
    queryKey.productItemList(requestParams),
    async ({ pageParam = 0 }) => {
      const queryString = getQueryString({
        ...requestParams,
        page: pageParam,
        size: '1',
      });

      const {
        data: { pagination, items },
      } = await getProductItemList(queryString);

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
