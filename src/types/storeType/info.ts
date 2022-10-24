import { UserInfo } from '#types/info';

export interface InfoState {
  // TODO: 서비스 고도화 전까지 styles 데이터 주석
  // styles: number[];
  gender: string;
  height: number;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColors: string[];
  bottomColors: string[];
  infoUpdate?: <T>(value: T, type: keyof UserInfo) => void;
}
