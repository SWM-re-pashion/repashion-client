import { DefaultData } from '#types/index';
import { btnTemplateBox, ClothesCategory } from '#types/info';
import {
  FilterStoreState,
  FilterType,
  FilterState,
} from '#types/storeType/filter';
import { bottomSizes } from '@constants/basic';
import { colorsData, topSizes } from '@constants/index';
import { fitsData, lengthsData, stylesData } from '@constants/style';

export type btnBox = btnTemplateBox<
  keyof Omit<FilterState, 'price'>,
  keyof ClothesCategory
> & {
  datas: (string | DefaultData)[];
};

type FilterElement = {
  style: string;
  price_goe: string;
  price_loe: string;
  color: string;
  fit: string;
  length: string;
  clothes_size: string;
};

const commonProps: btnBox[] = [
  {
    label: '스타일',
    type: 'style',
    datas: stylesData,
    noCheckColor: true,
  },
];

export const filterData = (category: FilterType): btnBox[] => {
  const categoryCondition = category === 'top' ? 'top' : 'bottom';
  switch (category) {
    case 'all':
      return [...commonProps];
    case 'top':
    case 'bottom':
      return [
        ...commonProps,
        {
          label: '컬러',
          type: 'color',
          subType: categoryCondition,
          isColor: true,
          datas: colorsData,
        },
        {
          label: '핏',
          type: 'fit',
          subType: categoryCondition,
          datas: fitsData[categoryCondition],
          noCheckColor: true,
        },
        {
          label: '기장',
          type: 'length',
          subType: categoryCondition,
          datas: lengthsData[categoryCondition],
          noCheckColor: true,
        },
        {
          label: '사이즈',
          type: 'clothesSize',
          subType: categoryCondition,
          datas: category === 'top' ? topSizes : bottomSizes,
          noCheckColor: true,
        },
      ];
    default:
      throw Error;
  }
};

export const getCategoryName = (category: string): FilterType => {
  switch (category) {
    case 'all':
    case 'recommend':
      return 'all';
    case 'top':
    case 'outer':
    case 'onepiece':
      return 'top';
    case 'bottom':
      return 'bottom';
    default:
      throw Error;
  }
};

export const getFilterElement = (
  category: FilterType,
  states: FilterStoreState,
): FilterElement => {
  const { style, price, color, fit, length, clothesSize } = states;
  const common = {
    style: style.join(','),
    price_goe: Math.min(...price).toString(),
    price_loe: Math.max(...price).toString(),
    color: '',
    fit: '',
    length: '',
    clothes_size: '',
  };

  if (category === 'all') return common;
  return {
    ...common,
    color: color[category].join(','),
    fit: fit[category].join(','),
    length: length[category].join(','),
    clothes_size: clothesSize[category].join(','),
  };
};

export const getFilteredProducts = (
  category: FilterType,
  states: FilterStoreState,
  router: (queryObj: { [queryName: string]: string }) => Promise<boolean>,
) => router(getFilterElement(category, states));
