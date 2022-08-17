import { FilterState } from '#types/storeType/filter';
import { UploadState } from '#types/storeType/upload';

export const infoInitialState = {
  styles: [],
  gender: '',
  height: '',
  bodyShape: '',
  topSize: [],
  bottomSize: [],
  topColors: [],
  bottomColors: [],
};

export const filterCommonState: {
  styles: string[];
  price: [number, number];
} = {
  styles: [],
  price: [0, 1000000],
};

export const filterInitialState: FilterState = {
  ...filterCommonState,
  colors: {
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
  size: {
    top: [],
    bottom: [],
  },
};

export const uploadInitialState: UploadState = {
  imgList: [],
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
    category: ['', '', ''],
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
};
