import { bodyShapes, bottomSizes, genders, topSizes } from '@constants/basic';
import { colors } from '@constants/index';
import { basicBtnBox, colorBtnBox } from 'types/index';

const basicBtnProps: basicBtnBox[] = [
  {
    label: '성별',
    type: 'gender',
    datas: genders,
    required: true,
  },
  {
    label: '체형',
    type: 'bodyShape',
    datas: bodyShapes,
    required: true,
  },
  {
    label: '상의 사이즈',
    type: 'topSize',
    datas: topSizes,
  },
  {
    label: '하의 사이즈(인치)',
    type: 'bottomSize',
    datas: bottomSizes,
  },
];

const colorBtnProps: colorBtnBox[] = [
  {
    label: '상의 컬러',
    type: 'topColor',
    datas: colors,
    isColor: true,
  },
  {
    label: '하의 컬러',
    type: 'bottomColor',
    datas: colors,
    isColor: true,
  },
];

export { basicBtnProps, colorBtnProps };
