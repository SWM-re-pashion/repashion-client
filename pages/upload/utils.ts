import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { bottomSizes, topSizes } from '@constants/basic';

type btnBox = btnTemplateBox<'size', undefined> & {
  datas: (string | DefaultData)[];
};

export const sizeData = (category: string): btnBox => {
  return {
    label: '사이즈',
    type: 'size',
    datas: category === 'top' || category === 'outer' ? topSizes : bottomSizes,
    noCheckColor: true,
    required: true,
  };
};
