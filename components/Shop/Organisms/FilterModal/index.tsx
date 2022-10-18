import { useCallback, useRef } from 'react';

import { FilterType } from '#types/storeType/filter';
import { useQueryObjRouter } from 'hooks';
import { useFilterStore } from 'store/useFilterStore';
import { filterMaxPrice, validatePriceRange } from 'utils';

import { max, priceProps } from './constants';
import FilterModalView from './FilterModalView';
import { btnBox, filterData, getFilteredProducts } from './utils';

type Props = {
  isOpen: boolean;
  mainCategory: FilterType;
  onClose: () => void;
};

export default function FilterModal(filterProps: Props) {
  const { isOpen, onClose, mainCategory } = filterProps;
  const router = useQueryObjRouter();
  const clearState = useFilterStore(useCallback((stat) => stat.clear, []));

  const states = useFilterStore((state) => state);
  const filterUpdate = useFilterStore(
    useCallback((stat) => stat.filterUpdate, []),
  );
  const priceUpdate = useFilterStore(
    useCallback((stat) => stat.priceUpdate, []),
  );
  const inputLeftRef = useRef<HTMLInputElement>(null);
  const inputRightRef = useRef<HTMLInputElement>(null);

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
      const { value } = e.target;
      const validatedNum = validatePriceRange(value, states.price, idx);
      const num = filterMaxPrice(validatedNum, max).toString();
      e.target.value = num;
      if (typeof idx === 'number') priceUpdate(+num, idx);
    },
    [priceUpdate, states.price],
  );

  const clear = () => {
    if (clearState) clearState(mainCategory);
  };

  const setFilter = useCallback(() => {
    getFilteredProducts(mainCategory, states, router);
    onClose();
  }, [mainCategory, router, states, onClose]);

  const compareData = useCallback(
    (options: btnBox): string[] => {
      if (options.type !== 'style' && options.subType)
        return states[options.type][options.subType];
      if (options.type === 'style') return states[options.type];
      return [];
    },
    [states],
  );

  const priceProp = priceProps(states.price);
  const filterDatas = filterData(mainCategory);

  const props = {
    isOpen,
    onClose: setFilter,
    setFilter,
    filterDatas,
    priceProp,
    compareData,
    filterUpdate,
    clear,
    inputLeftRef,
    inputRightRef,
    priceUpdate,
    handlePriceChange,
  };

  return <FilterModalView {...props} />;
}
