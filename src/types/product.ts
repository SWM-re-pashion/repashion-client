export type ProductBasicInfo = {
  title: string;
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
  bodyShape: string;
  fit: string;
  purchaseTime?: string;
  purchasePlace?: string;
};

export type ProductSizeInfo = {
  length?: number;
  shoulderWidth?: number;
  chestSection?: number;
  sleeveLength?: number;
  waistSection?: number;
  thighSection?: number;
  rise?: number;
  bottomSection?: number;
};

export type ProductFooterInfo = {
  price: number;
  isIncludeDelivery: boolean;
  updatedAt: string;
  like: number;
  views: number;
  contact: string;
};

export type SaleStatusDataProp = '판매완료' | '판매중' | '예약중';
