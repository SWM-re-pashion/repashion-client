import { DefaultData } from '#types/index';
import { btnTemplateBox } from '#types/info';
import { StyleUpload, UploadState } from '#types/storeType/upload';

type styleBtnBox = btnTemplateBox<keyof UploadState, keyof StyleUpload> & {
  datas: (string | DefaultData)[];
  subType: keyof StyleUpload;
};

export type sizeBtnBox = btnTemplateBox<'size', undefined> & {
  datas: (string | DefaultData)[];
};

const isTop = (category: string) => category === 'top' || category === 'outer';

export const styleData = (
  style?: res.StaticData,
  color?: res.KindStaticData,
): styleBtnBox[] => [
  {
    label: '스타일 태그 선택 (1개)',
    type: 'style',
    subType: 'tag',
    datas: style?.data || [],
    noCheckColor: true,
    childrenBox: true,
  },
  {
    label: '컬러 선택',
    type: 'style',
    subType: 'color',
    datas: color?.data.top || [],
    isColor: true,
    childrenBox: true,
  },
];

export const sizeData = (
  category: string,
  sizes?: res.KindStaticData,
): sizeBtnBox => {
  return {
    label: '사이즈',
    type: 'size',
    datas: sizes?.data[isTop(category) ? 'top' : 'bottom'] || [],
    noCheckColor: true,
    required: true,
  };
};

export type ReviewDatasInput = {
  pollution?: res.StaticData;
  lengths?: res.KindStaticData;
  bodyShapes?: res.StaticData;
  fits?: res.KindStaticData;
};

type ReviewDatasOutput = {
  condition: DefaultData[];
  pollution: DefaultData[];
  length: DefaultData[];
  bodyShapes: DefaultData[];
  fit: DefaultData[];
};

export const reviewData = (
  category: string,
  reviewDatas: ReviewDatasInput,
): ReviewDatasOutput => {
  return {
    condition: reviewDatas.pollution?.data || [],
    pollution: reviewDatas.pollution?.data || [],
    fit: reviewDatas.fits?.data[isTop(category) ? 'top' : 'bottom'] || [],
    bodyShapes: reviewDatas.bodyShapes?.data || [],
    length: reviewDatas.lengths?.data[isTop(category) ? 'top' : 'bottom'] || [],
  };
};
