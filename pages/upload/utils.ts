import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { bottomSizes, condition, topSizes, bodyShapes } from '@constants/basic';
import { fits, lengths } from '@constants/style';

type btnBox = btnTemplateBox<'size', undefined> & {
  datas: (string | DefaultData)[];
};

const isTop = (category: string) => category === 'top' || category === 'outer';

export const sizeData = (category: string): btnBox => {
  return {
    label: '사이즈',
    type: 'size',
    datas: isTop(category) ? topSizes : bottomSizes,
    noCheckColor: true,
    required: true,
  };
};

const allSlice = (arr: DefaultData[]) => arr.slice(1);

export const reviewData = (category: string) => {
  return {
    condition,
    pollution: condition,
    fit: isTop(category) ? allSlice(fits.top) : allSlice(fits.bottom),
    bodyShapes,
    length: isTop(category) ? allSlice(lengths.top) : allSlice(lengths.bottom),
  };
};
