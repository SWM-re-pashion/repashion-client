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
  updateUpload: (value, type, subType, idx) => {
    set((state) => {
      const isObjectType = type === 'style' || type === 'basicInfo';
      const isSubTypeColor = subType === 'color';
      const isSubTypeCategory = subType === 'category';
      const isTypeStyle = type === 'style';
      const isTypeBasicInfo = type === 'basicInfo';

      if (subType && isObjectType) {
        if (isSubTypeColor && isTypeStyle && typeof value === 'string') {
          return {
            ...state,
            [type]: {
              ...state[type],
              [subType]: updateInfo<string>(state[type][subType], value),
            },
          };
        } else if (
          isSubTypeCategory &&
          isTypeBasicInfo &&
          typeof value === 'string' &&
          idx !== undefined
        ) {
          const clone: [string, string, string] = [...state[type][subType]];
          clone[idx] = value;

          return {
            ...state,
            [type]: {
              ...state[type],
              [subType]: clone,
            },
          };
        } else {
          return {
            ...state,
            [type]: { ...state[type], [subType]: value },
          };
        }
      }
      return { ...state, [type]: value };
    });
  },
}));
