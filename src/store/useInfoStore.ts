import { UserInfo } from '#types/info';
import { InfoState } from '#types/storeType/info';
import { updateInfo } from 'src/utils';
import create from 'zustand';

import { infoInitialState } from './constants';

export const useInfoStore = create<InfoState>((set) => ({
  ...infoInitialState,
  infoUpdate: <T>(value: T, type: keyof UserInfo) => {
    set((state) => {
      const isStringArr =
        type === 'topSize' ||
        type === 'bottomSize' ||
        type === 'topColors' ||
        type === 'bottomColors';

      // TODO: 서비스 고도화 전까지 styles 데이터 주석
      // if (type === 'styles' && typeof value === 'number')
      //   return { [type]: updateInfo<number>(state[type], value) };
      if (isStringArr && typeof value === 'string')
        return { [type]: updateInfo<string>(state[type], value) };
      return { [type]: value };
    });
  },
}));
