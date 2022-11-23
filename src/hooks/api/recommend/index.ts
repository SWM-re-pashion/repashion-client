import { queryKey } from '@constants/react-query';
import {
  getTodayRecommendItem,
  getProductRecommendItemList,
} from 'src/api/recommend';

import { useCoreQuery } from '../core';

export function useTodayRecommendItem() {
  const response = useCoreQuery(
    queryKey.todayRecommend,
    () => getTodayRecommendItem(),
    {
      suspense: true,
    },
  );
  return response;
}

export function useProductRecommendItemList(id: string) {
  const response = useCoreQuery(
    queryKey.productRecommendItemList(id),
    () => getProductRecommendItemList(id),
    {
      suspense: true,
    },
  );
  return response;
}
