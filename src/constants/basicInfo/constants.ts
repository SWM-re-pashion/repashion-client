import { BasicUserInfo, btnTemplateBox } from '#types/info';

type btnBox = btnTemplateBox<keyof BasicUserInfo, undefined>;

const basicBtnProps: btnBox[] = [
  {
    label: '성별',
    type: 'gender',
    required: true,
  },
  {
    label: '체형',
    type: 'bodyShape',
    required: true,
  },
  {
    label: '상의 사이즈',
    type: 'topSize',
  },
  {
    label: '하의 사이즈(인치)',
    type: 'bottomSize',
  },
];

export { basicBtnProps };
