import { DefaultData } from '#types/index';
import { btnTemplateBox, ClothesCategory } from '#types/info';
import {
  FilterStoreState,
  FilterType,
  FilterState,
} from '#types/storeType/filter';
import { filterInitialState, priceInitState } from 'src/store/constants';

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

const filterStateToDataJoin = (strArr: string[]) => strArr.join(',');
const filterDataToStateSplit = (str: string) => str.split(',');

export const filterStateToQueryObj = (
  category: FilterType,
  states: FilterStoreState,
): FilterElement => {
  const { style, price, color, fit, length, clothesSize } = states;
  const common = {
    style: filterStateToDataJoin(style),
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
    color: filterStateToDataJoin(color[category]),
    fit: filterStateToDataJoin(fit[category]),
    length: filterStateToDataJoin(length[category]),
    clothesSize: filterStateToDataJoin(clothesSize[category]),
  };
};

export const getFilteredProducts = (
  category: FilterType,
  states: FilterStoreState,
  router: (queryObj: { [queryName: string]: string }) => Promise<boolean>,
) => router(filterStateToQueryObj(category, states));

export const filterQueryObjToState = (
  mainCategory: FilterType,
  queryObj: Record<keyof Omit<req.ShopFeed, 'page' | 'size'>, string>,
): FilterState => {
  const { style, priceGoe, priceLoe } = queryObj;
  const { color, fit, length: len, clothesSize: size } = queryObj;

  const isBottom = mainCategory === 'bottom';
  const priceData: [number, number] =
    priceGoe || priceLoe ? [+priceGoe, +priceLoe] : priceInitState;
  const styleData = style.length ? filterDataToStateSplit(style) : [];
  const colorData = color.length ? filterDataToStateSplit(color) : [];
  const fitData = fit.length ? filterDataToStateSplit(fit) : [];
  const lenData = len.length ? filterDataToStateSplit(len) : [];
  const sizeData = size.length ? filterDataToStateSplit(size) : [];
  const common: Pick<FilterState, 'style' | 'price'> = {
    style: styleData,
    price: priceData,
  };
  const topBotData = (bool: boolean, data: string[]) => (bool ? data : []);

  if (mainCategory === 'all') return { ...filterInitialState, ...common };
  return {
    ...common,
    color: {
      top: topBotData(!isBottom, colorData),
      bottom: topBotData(isBottom, colorData),
    },
    fit: {
      top: topBotData(!isBottom, fitData),
      bottom: topBotData(isBottom, fitData),
    },
    length: {
      top: topBotData(!isBottom, lenData),
      bottom: topBotData(isBottom, lenData),
    },
    clothesSize: {
      top: topBotData(!isBottom, sizeData),
      bottom: topBotData(isBottom, sizeData),
    },
  };
};
