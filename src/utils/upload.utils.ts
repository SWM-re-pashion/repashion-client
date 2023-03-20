/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadState, UploadStoreState } from '#types/storeType/upload';
import { imageList } from 'src/components/Upload/organisms/ImgUpload/utils';
import { uploadInitialState } from 'src/store/constants';

import { arrToString } from './arrToString';

const judgeValid = (states: UploadState) => {
  const { validation, style, isIncludeDelivery, basicInfo, sellerNote } =
    states;
  const { imgList, price, size, contact } = validation;

  const colorValid = !!style.color.length;
  const tagValid = !!style.tag;
  const materialValid = !!style.material;
  const titleValid = !!basicInfo.title;
  const categorySomeValid = !!basicInfo.category.some((x) => !!x);
  const brandValid = !!basicInfo.brand;
  const sellerSomeValid = Object.values(sellerNote).some((x) => !!x);

  return {
    isRemainState:
      imgList ||
      price ||
      size ||
      contact ||
      colorValid ||
      tagValid ||
      materialValid ||
      isIncludeDelivery ||
      titleValid ||
      categorySomeValid ||
      brandValid ||
      sellerSomeValid,
    isFormValid: Object.values(validation).every((x) => x),
  };
};

const refineUploadData = (data: UploadStoreState): req.UploadData => {
  const {
    imgUpload,
    removeImg,
    updateUpload,
    clearMeasure,
    clearUpload,
    ...rest
  } = data;
  const { imgList, measure, basicInfo, style } = rest;

  return {
    ...rest,
    imgList: imgList.map(({ src }) => src),
    basicInfo: {
      title: basicInfo.title,
      brand: basicInfo.brand,
      category: basicInfo.category[basicInfo.category.length - 1],
    },
    style: {
      ...style,
      color: arrToString(style.color),
    },
    measure: Object.entries(measure).reduce((acc, [key, value]) => {
      if (typeof value === 'number')
        return {
          ...acc,
          [key]: value,
        };
      return { ...acc };
    }, {}),
  };
};

const uploadedDataToState = (
  data?: res.UploadedProduct,
): UploadState | undefined => {
  if (!data) return undefined;

  const { imgList, basicInfo, style } = data.data;
  const { category } = basicInfo;
  const gender = category[0];
  const main = category.slice(0, 4);

  return {
    ...uploadInitialState,
    ...data.data,
    imgList: imageList(imgList),
    basicInfo: {
      ...basicInfo,
      category: [gender, main, category],
      curCategoryIdx: 0,
    },
    style: {
      ...style,
      color: style.color.split('/'),
    },
  };
};

export { judgeValid, refineUploadData, uploadedDataToState };
