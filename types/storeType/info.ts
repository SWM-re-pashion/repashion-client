import { UserInfo } from '#types/info';
import { State } from 'zustand';

export interface InfoState extends State {
  styles: number[];
  gender: string;
  height: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColors: string[];
  bottomColors: string[];
  infoUpdate?: <T>(value: T, type: keyof UserInfo) => void;
}
