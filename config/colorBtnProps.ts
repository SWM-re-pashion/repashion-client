import { colors } from '@constants/index';
import { colorBtnBox } from 'types/index';

const colorBtnProps: colorBtnBox[] = [
  {
    label: '상의 컬러',
    type: 'TOP_COLOR',
    datas: colors,
    prop: 'topColor',
    isColor: true,
  },
  {
    label: '하의 컬러',
    type: 'BOTTOM_COLOR',
    datas: colors,
    prop: 'bottomColor',
    isColor: true,
  },
];

export { colorBtnProps };
