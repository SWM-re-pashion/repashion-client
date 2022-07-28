import { filterBtnBox } from '#types/info';
import { bottomSizes } from '@constants/basic';
import { colors, topSizes } from '@constants/index';
import { fits, lengths, styles } from '@constants/style';

const commonProps: filterBtnBox[] = [
  {
    label: '스타일',
    type: 'styles',
    datas: styles,
  },
];

export const filterData = (category: string): filterBtnBox[] => {
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
          subType: category,
          isColor: true,
          datas: colors,
        },
        {
          label: '핏',
          type: 'fit',
          subType: category,
          datas: fits[category],
        },
        {
          label: '기장',
          type: 'length',
          subType: category,
          datas: lengths[category],
        },
        {
          label: '사이즈',
          type: 'size',
          subType: category,
          datas: category === 'top' ? topSizes : bottomSizes,
        },
      ];
    default:
      throw Error;
  }
};
