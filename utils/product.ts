import {
  ProductSizeInfo,
  ProductNoticeInfo,
  ProductBasicInfo,
} from '#types/product';
import { Skirt, OnePiece, Pants, Top } from '@atoms/icon';

import { replace } from './replace';

export const productBasicUtil = (basic: ProductBasicInfo) => {
  const { brand, productInfo, styleInfo } = basic;

  return [
    { label: '브랜드', desc: brand },
    { label: '판매제품 정보', desc: replace(productInfo, '/', '・') },
    {
      label: '스타일 정보',
      desc: replace(styleInfo, '/', '・'),
      isBottom: true,
    },
  ];
};

export const productNoticeUtil = (notice: ProductNoticeInfo) => {
  const {
    condition,
    pollution,
    height,
    length,
    bodyForm,
    fit,
    purchaseTime,
    purchasePlace,
  } = notice;

  return [
    { label: '사용감', desc: condition },
    { label: '오염 여부', desc: pollution },
    { label: '기장', desc: `키 ${height}cm 기준, ${length}까지` },
    { label: `${bodyForm}체형 기준`, desc: `${fit}핏이에요` },
    { label: '구매시기', desc: purchaseTime },
    { label: '구매처', desc: purchasePlace },
  ];
};

export const productSizeUtil = (size: ProductSizeInfo) => {
  const {
    length,
    shoulderWidth,
    chestSection,
    sleeveLength,
    waistSection,
    thighSection,
    rise,
    bottomSection,
  } = size;

  return [
    { label: '총장', desc: length },
    { label: '어깨너비', desc: shoulderWidth },
    { label: '가슴단면', desc: chestSection },
    { label: '소매길이', desc: sleeveLength },
    { label: '허리단면', desc: waistSection },
    { label: '허벅지단면', desc: thighSection },
    { label: '밑위', desc: rise },
    { label: '밑단단면', desc: bottomSection },
  ];
};

export const judgeProductIcon = (kind: string) => {
  if (kind.includes('스커트')) return Skirt;
  if (kind.includes('원피스')) return OnePiece;
  if (kind.includes('하의')) return Pants;
  return Top;
};
