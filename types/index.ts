export type ActionProps = {
  type: string;
  payload: string;
};

export type BasicUserInfo = {
  gender: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
};

export type ColorUserInfo = {
  topColor: string[];
  bottomColor: string[];
};

type btnBox = {
  label: string;
  type: string;
  datas: (string | [string, string])[];
  required?: boolean;
};

export type basicBtnBox = {
  prop: keyof BasicUserInfo;
} & btnBox;

export type colorBtnBox = {
  prop: keyof ColorUserInfo;
  isColor?: boolean;
} & btnBox;
