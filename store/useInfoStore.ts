import { InfoState } from '#types/storeType/info';
import { UserInfo } from 'types/info';
import { updateInfo } from 'utils';
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

      if (type === 'styles' && typeof value === 'number')
        return { [type]: updateInfo<number>(state[type], value) };
      if (isStringArr && typeof value === 'string')
        return { [type]: updateInfo<string>(state[type], value) };
      return { [type]: value };
    });
  },
}));
