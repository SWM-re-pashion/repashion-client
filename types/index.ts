export type ActionProps = {
  type: string;
  payload: string;
};

export type BasicUserInfo = {
  gender: string;
  bodyForm: string;
  topSize: string[];
  bottomSize: string[];
};

export type ColorUserInfo = {
  topColor: string[];
  bottomColor: string[];
};
