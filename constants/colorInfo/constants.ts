import { btnTemplateBox, ColorUserInfo } from '#types/info';

type btnBox = btnTemplateBox<keyof ColorUserInfo, undefined>;

const colorBtnProps: btnBox[] = [
  {
    label: '상의 컬러',
    type: 'topColors',
    isColor: true,
  },
  {
    label: '하의 컬러',
    type: 'bottomColors',
    isColor: true,
  },
];

export { colorBtnProps };
