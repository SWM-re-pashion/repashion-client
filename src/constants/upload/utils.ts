import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { bottomSizes, condition, topSizes, bodyShapes } from '@constants/basic';
import { fitsData, lengthsData } from '@constants/style';

export type sizeBtnBox = btnTemplateBox<'size', undefined> & {
  datas: (string | DefaultData)[];
};

const isTop = (category: string) => category === 'top' || category === 'outer';

export const sizeData = (category: string): sizeBtnBox => {
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
    fit: isTop(category) ? allSlice(fitsData.top) : allSlice(fitsData.bottom),
    bodyShapes,
    length: isTop(category)
      ? allSlice(lengthsData.top)
      : allSlice(lengthsData.bottom),
  };
};
