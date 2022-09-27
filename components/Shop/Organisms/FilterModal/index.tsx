import { useCallback, useRef } from 'react';

import { useQueryObjRouter } from 'hooks';
import { useFilterStore } from 'store/useFilterStore';
import { filterPrice } from 'utils';

import { max, priceProps } from './constants';
import FilterModalView from './FilterModalView';
import {
  btnBox,
  filterData,
  getCategoryName,
  getFilteredProducts,
} from './utils';

type Props = {
  isOpen: boolean;
  mainCategory: string;
  onClose: () => void;
};

export default function FilterModalWrapper(wrapperProps: Props) {
  const { isOpen, onClose, mainCategory } = wrapperProps;
  const category = getCategoryName(mainCategory);
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
      const num = filterPrice(e.target.value, max).toString();
      e.target.value = num;
      if (typeof idx === 'number') priceUpdate(+num, idx);
    },
    [priceUpdate],
  );

  const clear = () => {
    if (clearState) clearState(category);
  };

  const setFilter = useCallback(() => {
    getFilteredProducts(category, states, router);
    onClose();
  }, [category, router, states, onClose]);

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
  const filterDatas = filterData(category);

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
