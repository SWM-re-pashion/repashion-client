import { useEffect } from 'react';

import { FilterType } from '#types/storeType/filter';
import { filterQueryObjToState } from 'src/components/Shop/Organisms/FilterModal/utils';
import { useFilterStore } from 'src/store/useFilterStore';

export default function useInitFilterState(
  mainCategory: FilterType,
  queryObj: Record<keyof Omit<req.ShopFeed, 'page' | 'size'>, string>,
) {
  const initFilterState = useFilterStore((state) => state.initState);

  useEffect(() => {
    initFilterState(filterQueryObjToState(mainCategory, queryObj));
  }, [mainCategory, queryObj]);
}
