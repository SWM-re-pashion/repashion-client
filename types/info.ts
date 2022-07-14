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
  topColor: string[];
  bottomColor: string[];
};

export type ColorUserInfo = {
  topColor: string[];
  bottomColor: string[];
};

type btnBox = {
  label: string;
  datas: (string | [string, string])[];
  required?: boolean;
};

export type basicBtnBox = {
  type: keyof BasicUserInfo;
} & btnBox;

export type colorBtnBox = {
  type: keyof ColorUserInfo;
  isColor?: boolean;
} & btnBox;
