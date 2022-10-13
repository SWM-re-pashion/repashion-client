import { FilterState } from '#types/storeType/filter';
import { SearchState } from '#types/storeType/search';
import { UploadState } from '#types/storeType/upload';

export const infoInitialState = {
  styles: [],
  gender: '',
  height: 0,
  bodyShape: '',
  topSize: [],
  bottomSize: [],
  topColors: [],
  bottomColors: [],
};

export const filterCommonState: {
  style: string[];
  price: [number, number];
} = {
  style: [],
  price: [0, 1000000],
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
