import { useCallback, useRef } from 'react';

import { FilterType } from '#types/storeType/filter';
import { btnBox, filterData, getFilteredProducts } from 'src/helpers/filter';
import { useQueryObjRouter } from 'src/hooks';
import { useStaticData } from 'src/hooks/api/staticData';
import { useFilterStore } from 'src/store/useFilterStore';
import { filterMaxPrice, validatePriceRange } from 'src/utils';

import { max, priceProps } from './constants';
import FilterModalView from './FilterModalView';

type Props = {
  isOpen: boolean;
  mainCategory: FilterType;
  onClose: () => void;
};

export default function FilterModal(filterProps: Props) {
  const { isOpen, onClose, mainCategory } = filterProps;
  const { data: styles } = useStaticData<res.StaticData>('Style');
  const { data: colors } = useStaticData<res.KindStaticData>('Color');
  const { data: sizes } = useStaticData<res.KindStaticData>('Size');
  const { data: lengths } = useStaticData<res.KindStaticData>('Length');
  const { data: fits } = useStaticData<res.KindStaticData>('Fit');
  const datas = { styles, colors, sizes, lengths, fits };

  const router = useQueryObjRouter();
  const clearState = useFilterStore((stat) => stat.clear);

  const states = useFilterStore((state) => state);
  const filterUpdate = useFilterStore((stat) => stat.filterUpdate);
  const priceUpdate = useFilterStore((stat) => stat.priceUpdate);
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

  const setFilter = () => {
    getFilteredProducts(mainCategory, states, router);
    onClose();
  };

  const compareData = (options: btnBox): string[] => {
    if (options.type !== 'style' && options.subType)
      return states[options.type][options.subType];
    if (options.type === 'style') return states[options.type];
    return [];
  };

  const priceProp = priceProps(states.price);
  const filterDatas = filterData(mainCategory, datas);

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
