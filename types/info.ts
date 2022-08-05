import { DefaultData } from './index';

export type BasicUserInfo = {
  gender: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
};

export type UserInfo = {
  styles: number[];
  gender: string;
  height: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColors: string[];
  bottomColors: string[];
};

export type ColorUserInfo = {
  topColors: string[];
  bottomColors: string[];
};

export type ClothesCategory = {
  top: string[];
  bottom: string[];
};

export type FilterInfo = {
  styles: string[];
  colors: ClothesCategory;
  fit: ClothesCategory;
  length: ClothesCategory;
  size: ClothesCategory;
};

export type btnTemplateBox<T, U> = {
  label: string;
  type: T;
  subType?: U;
  datas?: (string | DefaultData)[];
  isColor?: boolean;
  noCheckColor?: boolean;
  childrenBox?: boolean;
  required?: boolean;
};
