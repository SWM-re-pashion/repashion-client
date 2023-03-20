/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadState, UploadStoreState } from '#types/storeType/upload';
import { imageList } from 'src/components/Upload/organisms/ImgUpload/utils';
import { uploadInitialState } from 'src/store/constants';

import { arrToString } from './arrToString';

const isUploadRemained = (states: UploadState) => {
  const { validation, style, isIncludeDelivery, basicInfo, sellerNote } =
    states;
  const { imgList, price, size, contact } = validation;

  return (
    imgList ||
    price ||
    size ||
    contact ||
    isIncludeDelivery ||
    !!style.color.length ||
    !!style.tag ||
    !!style.material ||
    !!basicInfo.title ||
    !!basicInfo.category.some((x) => !!x) ||
    !!basicInfo.brand ||
    Object.values(sellerNote).some((x) => !!x)
  );
};

const refineUploadData = (data: UploadStoreState): req.UploadData => {
  const {
    validation,
    imgUpload,
    removeImg,
    updateUpload,
    clearMeasure,
    clearUpload,
    updateArr,
    updateValidate,
    initMeasure,
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

export { isUploadRemained, refineUploadData, uploadedDataToState };
