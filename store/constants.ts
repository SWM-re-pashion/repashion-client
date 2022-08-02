import { FilterState } from '#types/storeType/filter';

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
