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

export type ColorData = { name: string; code: string };

type btnBox = {
  label: string;
  required?: boolean;
};

export type basicBtnBox = {
  datas: string[];
  type: keyof BasicUserInfo;
} & btnBox;

export type colorBtnBox = {
  type: keyof ColorUserInfo;
  isColor?: boolean;
} & btnBox;
