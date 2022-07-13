import { bodyShapes, bottomSizes, genders, topSizes } from '@constants/basic';
import { basicBtnBox } from 'types/index';

const basicBtnProps: basicBtnBox[] = [
  {
    label: '성별',
    type: 'GENDER',
    datas: genders,
    prop: 'gender',
    required: true,
  },
  {
    label: '체형',
    type: 'BODY_SHAPE',
    datas: bodyShapes,
    prop: 'bodyShape',
    required: true,
  },
  {
    label: '상의 사이즈',
    type: 'TOP_SIZE',
    datas: topSizes,
    prop: 'topSize',
  },
  {
    label: '하의 사이즈(인치)',
    type: 'BOTTOM_SIZE',
    datas: bottomSizes,
    prop: 'bottomSize',
  },
];

export { basicBtnProps };
