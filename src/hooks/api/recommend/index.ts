import { queryKey } from '@constants/react-query';
import { getTodayRecommendItem } from 'src/api/recommend';

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
