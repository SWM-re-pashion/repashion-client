import { DefaultData } from '#types/index';
import { btnTemplateBox, ClothesCategory, FilterInfo } from '#types/info';
import { bottomSizes } from '@constants/basic';
import { colors, topSizes } from '@constants/index';
import { fits, lengths, styles } from '@constants/style';

import { FilterType } from '../../../../types/storeType/filter';

type btnBox = btnTemplateBox<keyof FilterInfo, keyof ClothesCategory> & {
  datas: (string | DefaultData)[];
};

const commonProps: btnBox[] = [
  {
    label: '스타일',
    type: 'styles',
    datas: styles,
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
          datas: colors,
        },
        {
          label: '핏',
          type: 'fit',
          subType: categoryCondition,
          datas: fits[categoryCondition],
          noCheckColor: true,
        },
        {
          label: '기장',
          type: 'length',
          subType: categoryCondition,
          datas: lengths[categoryCondition],
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
