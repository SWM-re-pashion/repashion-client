import { FilterState } from '#types/storeType/filter';
import { SearchState } from '#types/storeType/search';
import { UploadState } from '#types/storeType/upload';

export const infoInitialState = {
  // styles: [],
  gender: '',
  height: 0,
  bodyShape: '',
  topSize: [],
  bottomSize: [],
  topColors: [],
  bottomColors: [],
};

export const priceInitState: [number, number] = [0, 1000000];

export const filterCommonState: {
  style: string[];
  price: [number, number];
} = {
  style: [],
  price: priceInitState,
};

export const filterInitialState: FilterState = {
  ...filterCommonState,
  color: {
    top: [],
    bottom: [],
  },
  fit: {
    top: [],
    bottom: [],
  },
  length: {
    top: [],
    bottom: [],
  },
  clothesSize: {
    top: [],
    bottom: [],
  },
};

export const uploadInitialState: UploadState = {
  validation: {
    imgList: false,
    style: false,
    price: false,
    basicInfo: false,
    sellerNote: false,
    size: false,
    contact: false,
  },
  imgList: [], // TODO: refine
  contact: '',
  style: {
    tag: '',
    color: [],
    material: '',
  },
  price: 0,
  isIncludeDelivery: false,
  basicInfo: {
    title: '',
    curCategoryIdx: 0,
    category: ['', '', ''], // TODO: refine
    brand: '',
  },
  size: '',
  sellerNote: {
    condition: '',
    pollution: '',
    height: 0,
    bodyShape: '',
    length: '',
    fit: '',
  },
  measure: {
    length: 0,
    shoulderWidth: 0,
    chestSection: 0,
    sleeveLength: 0,
  },
  measureType: 'top',
  additionalInfo: {
    purchaseTime: '',
    purchasePlace: '',
  },
  opinion: '',
};

export const initialSearchState: SearchState = {
  keywords: [],
  latestProducts: [],
};

export type ObjType =
  | 'style'
  | 'basicInfo'
  | 'sellerNote'
  | 'measure'
  | 'additionalInfo';

export const isObjectType = (type: keyof UploadState): type is ObjType =>
  type === 'style' ||
  type === 'basicInfo' ||
  type === 'sellerNote' ||
  type === 'measure' ||
  type === 'additionalInfo';
