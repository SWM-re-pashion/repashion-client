import { DefaultData } from './index';

export type BasicUserInfo = {
  gender: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
};

export type UserInfo = {
  // TODO: 서비스 고도화 전까지 styles 데이터 주석
  // styles: number[];
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
