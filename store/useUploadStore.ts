import { ImgBasicProps } from '#types/index';
import {
  StyleUpload,
  UploadState,
  UploadStoreState,
} from '#types/storeType/upload';
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
  updateUpload: (
    type: keyof UploadState,
    value: string,
    subType?: keyof StyleUpload,
  ) => {
    set((state) => {
      const isValidSubType = subType === 'color';
      if (subType) {
        if (isValidSubType && type !== 'imgList' && typeof value === 'string')
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
      return state;
    });
  },
}));
