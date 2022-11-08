import { DefaultData } from '#types/index';
import { btnTemplateBox, ClothesCategory } from '#types/info';
import {
  FilterStoreState,
  FilterType,
  FilterState,
} from '#types/storeType/filter';

export type btnBox = btnTemplateBox<
  keyof Omit<FilterState, 'price'>,
  keyof ClothesCategory
> & {
  datas: (string | DefaultData)[];
};

type FilterDatas = {
  styles?: res.StaticData;
  colors?: res.KindStaticData;
  sizes?: res.KindStaticData;
  fits?: res.KindStaticData;
  lengths?: res.KindStaticData;
};

type FilterElement = {
  style: string;
  priceGoe: string;
  priceLoe: string;
  color: string;
  fit: string;
  length: string;
  clothesSize: string;
};

const commonProps = (styles: FilterDatas['styles']): btnBox[] => [
  {
    label: '스타일',
    type: 'style',
    datas: styles?.data || [],
    noCheckColor: true,
  },
];

export const filterData = (
  category: FilterType,
  datas: FilterDatas,
): btnBox[] => {
  const { styles, colors, sizes, fits, lengths } = datas;
  const commonData = commonProps(styles);
  const categoryCondition = category === 'top' ? 'top' : 'bottom';
  switch (category) {
    case 'all':
      return [...commonData];
    case 'top':
    case 'bottom':
      return [
        ...commonData,
        {
          label: '컬러',
          type: 'color',
          subType: categoryCondition,
          isColor: true,
          datas: colors?.data.top || [],
        },
        {
          label: '핏',
          type: 'fit',
          subType: categoryCondition,
          datas: fits?.data[categoryCondition] || [],
          noCheckColor: true,
        },
        {
          label: '기장',
          type: 'length',
          subType: categoryCondition,
          datas: lengths?.data[categoryCondition] || [],
          noCheckColor: true,
        },
        {
          label: '사이즈',
          type: 'clothesSize',
          subType: categoryCondition,
          datas: sizes?.data[category === 'top' ? 'top' : 'bottom'] || [],
          noCheckColor: true,
        },
      ];
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
    priceGoe: Math.min(...price).toString(),
    priceLoe: Math.max(...price).toString(),
    color: '',
    fit: '',
    length: '',
    clothesSize: '',
  };

  if (category === 'all') return common;
  return {
    ...common,
    color: color[category].join(','),
    fit: fit[category].join(','),
    length: length[category].join(','),
    clothesSize: clothesSize[category].join(','),
  };
};

export const getFilteredProducts = (
  category: FilterType,
  states: FilterStoreState,
  router: (queryObj: { [queryName: string]: string }) => Promise<boolean>,
) => router(getFilterElement(category, states));
