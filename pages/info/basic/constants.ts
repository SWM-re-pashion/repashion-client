import { DefaultData } from '#types/index';
import { BasicUserInfo, btnTemplateBox } from '#types/info';
import { bodyShapes, bottomSizes, genders, topSizes } from '@constants/basic';

type btnBox = btnTemplateBox<keyof BasicUserInfo, undefined> & {
  datas: (string | DefaultData)[];
};

const basicBtnProps: btnBox[] = [
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

export { basicBtnProps };
