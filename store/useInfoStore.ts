import { UserInfo } from 'types';
import { updateInfo } from 'utils';
import create, { State } from 'zustand';

interface InfoState extends State {
  styles: number[];
  gender: string;
  height: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColor: string[];
  bottomColor: string[];
  infoUpdate: <T>(type: keyof UserInfo, value: T) => void;
}

export const useInfoStore = create<InfoState>((set) => ({
  styles: [],
  gender: '',
  height: '',
  bodyShape: '',
  topSize: [],
  bottomSize: [],
  topColor: [],
  bottomColor: [],
  infoUpdate: <T>(type: keyof UserInfo, value: T) => {
    set((state) => {
      const isStringArr =
        type === 'topSize' ||
        type === 'bottomSize' ||
        type === 'topColor' ||
        type === 'bottomColor';

      if (type === 'styles' && typeof value === 'number')
        return { [type]: updateInfo<number>(state[type], value) };
      if (isStringArr && typeof value === 'string')
        return { [type]: updateInfo<string>(state[type], value) };
      return { [type]: value };
    });
  },
}));
