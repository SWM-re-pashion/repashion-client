import { btnTemplateBox, ColorUserInfo } from '#types/info';

const colorBtnProps: btnTemplateBox<keyof ColorUserInfo, undefined>[] = [
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
