import { ImgBasicProps } from '#types/index';
import { UploadStoreState } from '#types/storeType/upload';
import { deepClone, updateInfo } from 'utils';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { uploadInitialState } from './constants';

export const useUploadStore = create(
  persist<UploadStoreState>(
    (set) => ({
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
      clearMeasure: () => {
        set((state) => {
          const clone = deepClone(state.measure);
          Object.keys(clone).forEach((key) => {
            clone[key] = 0; // Todo: immer로 리팩토링
          });
          return {
            ...state,
            measure: clone,
          };
        });
      },
      clearUpload: () => {
        set(() => {
          const clone = deepClone(uploadInitialState);
          return clone;
        });
      },
      updateUpload: (value, type, subType, idx) => {
        set((state) => {
          const isObjectType =
            type === 'style' ||
            type === 'basicInfo' ||
            type === 'sellerNote' ||
            type === 'measure' ||
            type === 'additionalInfo';
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
            }
            if (
              isSubTypeCategory &&
              isTypeBasicInfo &&
              typeof value === 'string' &&
              idx !== undefined
            ) {
              if (state[type][subType][idx] === value) return state;

              let clone: [string, string, string] = [...state[type][subType]];

              if (idx === 1) clone = [clone[0], value, ''];
              else if (idx === 0) clone = [value, '', ''];
              else clone[idx] = value;

              return {
                ...state,
                [type]: {
                  ...state[type],
                  [subType]: clone,
                },
              };
            }
            return {
              ...state,
              [type]: { ...state[type], [subType]: value },
            };
          }
          return { ...state, [type]: value };
        });
      },
    }),
    {
      name: 'upload-storage',
    },
  ),
);
