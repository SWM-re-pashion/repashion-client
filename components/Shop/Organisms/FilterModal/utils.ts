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
  styles: string;
  price: string;
  colors: string | null;
  fit: string | null;
  length: string | null;
  size: string | null;
};

const commonProps: btnBox[] = [
  {
    label: '스타일',
    type: 'styles',
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
          type: 'colors',
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
          type: 'size',
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
  const { styles, price, colors, fit, length, size } = states;
  const common = {
    styles: styles.join(','),
    price: price.join(','),
    colors: null,
    fit: null,
    length: null,
    size: null,
  };

  if (category === 'all') return common;
  return {
    ...common,
    colors: colors[category].join(','),
    fit: fit[category].join(','),
    length: length[category].join(','),
    size: size[category].join(','),
  };
};

export const getFilteredProducts = (
  category: FilterType,
  states: FilterStoreState,
  router: (queryObj: {
    [queryName: string]: string | null;
  }) => Promise<boolean>,
) => router(getFilterElement(category, states));
