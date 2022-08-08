import { ImgBasicProps } from '#types/index';
import { UploadStoreState } from '#types/storeType/upload';
import { updateInfo } from 'utils';
import create from 'zustand';

import { uploadInitialState } from './constants';

export const useUploadStore = create<UploadStoreState>((set) => ({
  ...uploadInitialState,
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => {
    set((state) => {
      return {
        ...state,
        imgList: [...imgList],
      };
    });
  },
  removeImg: (removeId: number) => {
    set((state) => {
      return {
        ...state,
        imgList: [...state.imgList.filter(({ id }) => id !== removeId)],
      };
    });
  },
  updateUpload: (value, type, subType) => {
    set((state) => {
      const isValidSubType = subType === 'color';
      const isValidType = type === 'style';

      if (subType && isValidType) {
        if (isValidSubType && typeof value === 'string')
          return {
            ...state,
            [type]: {
              ...state[type],
              [subType]: updateInfo<string>(state[type][subType], value),
            },
          };
        return {
          ...state,
          [type]: { ...state[type], [subType]: value },
        };
      }
      return { ...state, [type]: value };
    });
  },
}));
