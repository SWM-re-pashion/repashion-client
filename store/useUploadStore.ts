import { ImgBasicProps } from '#types/index';
import { UploadStoreState } from '#types/storeType/upload';
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
}));
