import { ImgBasicProps } from '#types/index';
import {
  UploadStoreState,
  Measure,
  ValidationKey,
  UploadState,
} from '#types/storeType/upload';
import { isObjectType, uploadInitialState } from 'src/store/constants';
import { deepClone, updateInfo } from 'src/utils';
import { StateCreator } from 'zustand';

export const createUploadSlice: StateCreator<
  UploadStoreState,
  [['zustand/persist', unknown]] | [],
  [],
  UploadStoreState
> = (set, get) => ({
  ...uploadInitialState,
  getIsRemained: () => {
    const { validation, style, isIncludeDelivery, basicInfo, sellerNote } =
      get();
    const { imgList, price, size, contact } = validation;
    const validationRemain =
      imgList || price || size || contact || isIncludeDelivery;
    const styleRemain = !!style.color.length || !!style.tag || !!style.material;
    const basicRemain =
      !!basicInfo.category.some((x) => !!x) || !!basicInfo.brand;
    const sellerNoteRemain = Object.values(sellerNote).some((x) => !!x);
    return validationRemain || styleRemain || basicRemain || sellerNoteRemain;
  },
  updateValidate: (type: ValidationKey, isValidate: boolean) => {
    set((state) => ({
      ...state,
      validation: {
        ...state.validation,
        [type]: isValidate,
      },
    }));
  },
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
  initState: (state: UploadState) => {
    set(state);
  },
  initMeasure: (measures: Measure) => {
    set((state) => {
      return {
        ...state,
        measure: { ...measures },
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
    set(uploadInitialState);
  },
  updateArr: (value, type, subType) => {
    const isObject = isObjectType(type);
    set((state) => {
      if (subType && isObject)
        return {
          ...state,
          [type]: {
            ...state[type],
            [subType]: value,
          },
        };
      return { ...state, [type]: value };
    });
  },
  updateUpload: (value, type, subType, idx) => {
    set((state) => {
      const isSubTypeColor = subType === 'color';
      const isSubTypeCategory = subType === 'category';
      const isTypeStyle = type === 'style';
      const isTypeBasicInfo = type === 'basicInfo';

      if (subType && isObjectType(type)) {
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
});
