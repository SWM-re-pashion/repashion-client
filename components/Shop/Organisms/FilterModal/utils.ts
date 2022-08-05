import { DefaultData } from '#types/index';
import { btnTemplateBox, ClothesCategory, FilterInfo } from '#types/info';
import { bottomSizes } from '@constants/basic';
import { colors, topSizes } from '@constants/index';
import { fits, lengths, styles } from '@constants/style';

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

export const filterData = (category: string): btnBox[] => {
  const categoryCondition =
    category === 'top' || category === 'outer' ? 'top' : 'bottom';
  switch (category) {
    case 'all':
      return [...commonProps];
    case 'top':
    case 'bottom':
    case 'outer':
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
          datas:
            category === 'top' || category === 'outer' ? topSizes : bottomSizes,
          noCheckColor: true,
        },
      ];
    default:
      throw Error;
  }
};
