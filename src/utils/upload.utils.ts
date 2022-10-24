/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadState, UploadStoreState } from '#types/storeType/upload';
import { uploadInitialState } from 'src/store/constants';

import { arrToString } from './arrToString';

const judgeValid = (states: UploadState) => {
  const { imgList, style, price, isIncludeDelivery, basicInfo } = states;
  const { size, sellerNote, contact } = states;
  const { title, category, brand } = basicInfo;
  const imgListValid = !!imgList.length;
  const colorValid = !!style.color.length;
  const tagValid = !!style.tag;
  const materialValid = !!style.material;
  const priceValid = !!price;
  const deliveryValid = isIncludeDelivery;
  const titleValid = !!title;
  const categoryValid = !!category.every((x) => !!x);
  const categorySomeValid = !!category.some((x) => !!x);
  const brandValid = !!brand;
  const sellerValid = Object.values(sellerNote).every((x) => !!x);
  const sellerSomeValid = Object.values(sellerNote).some((x) => !!x);
  const sizeValid = !!size;
  const contactValid = !!contact;

  return {
    isRemainState:
      imgListValid ||
      colorValid ||
      tagValid ||
      materialValid ||
      priceValid ||
      deliveryValid ||
      titleValid ||
      categorySomeValid ||
      brandValid ||
      sellerSomeValid ||
      contactValid ||
      sizeValid,
    isFormValid:
      imgListValid &&
      colorValid &&
      tagValid &&
      materialValid &&
      priceValid &&
      deliveryValid &&
      titleValid &&
      categoryValid &&
      brandValid &&
      sellerValid &&
      contactValid &&
      sizeValid,
    isImgValid: imgListValid,
    isStyleValid: colorValid && tagValid && materialValid,
    isPriceValid: priceValid,
    isBasicValid: titleValid && categoryValid && brandValid,
    isSellerValid: sellerValid,
    isSizeValid: sizeValid,
    isContactValid: contactValid,
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
      ...basicInfo,
      category: basicInfo.category[basicInfo.category.length - 1],
    },
    style: {
      ...style,
      color: arrToString(style.color),
    },
    measureType: rest.measureType?.toUpperCase() || null,
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
    imgList: imgList.map((img, id) => ({ id: id + 1, src: img })),
    basicInfo: {
      ...basicInfo,
      category: [gender, main, category],
      curCategoryIdx: 0,
    },
    style: {
      ...style,
      color: style.color.split('/'),
    },
    measureType: data.data.measureType?.toLowerCase() || null,
  };
};

export { judgeValid, refineUploadData, uploadedDataToState };
