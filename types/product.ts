import { ImgProps } from '#types/index';

export type ProductBasicInfo = {
  title: string;
  image?: ImgProps[];
  classification: string;
  brand: string;
  productInfo: string;
  styleInfo: string;
};

export type ProductNoticeInfo = {
  condition: string;
  pollution: string;
  height: string;
  length: string;
  bodyForm: string;
  fit: string;
  purchaseTime: string;
  purchasePlace: string;
  reason: string;
  opinion?: string;
};
