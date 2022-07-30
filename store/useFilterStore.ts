import { FilterInfo, ClothesCategory } from 'types/info';
import { updateInfo, deepClone } from 'utils';
import create, { State } from 'zustand';

export interface FilterState extends State {
  styles: string[];
  colors: {
    top: string[];
    bottom: string[];
  };
  fit: {
    top: string[];
    bottom: string[];
  };
  length: {
    top: string[];
    bottom: string[];
  };
  size: {
    top: string[];
    bottom: string[];
  };
  price: [number, number];
}

interface FilterStoreState extends FilterState {
  filterUpdate: (
    type: keyof FilterInfo,
    value: string,
    subType?: keyof ClothesCategory,
  ) => void;
  priceUpdate: (value: number, idx: number) => void;
  clear: () => void;
}

export const initialState: FilterState = {
  styles: [],
  colors: {
    top: [],
    bottom: [],
  },
  fit: {
    top: [],
    bottom: [],
  },
  length: {
    top: [],
    bottom: [],
  },
  size: {
    top: [],
    bottom: [],
  },
  price: [0, 0],
};

export const useFilterStore = create<FilterStoreState>((set) => ({
  ...initialState,
  priceUpdate: (value: number, idx: number) => {
    set((state) => {
      const toBeModified: [number, number] = [...state.price];
      toBeModified[idx] = value;
      return { ...state, price: toBeModified };
    });
  },
  clear: () => {
    set((state) => ({ ...state, ...deepClone(initialState) }));
  },
  filterUpdate: (
    type: keyof FilterInfo,
    value: string,
    subType?: keyof ClothesCategory,
  ) => {
    set((state) => {
      const removeAllCatecory = (arr: string[]) =>
        arr.filter((x) => x !== '전체');
      const isValueAll = typeof value === 'string' && value === '전체';

      if (type === 'styles') {
        if (type === 'styles' && isValueAll)
          return { ...state, [type]: [value] };
        return {
          ...state,
          [type]: removeAllCatecory(updateInfo<string>(state[type], value)),
        };
      }

      if (subType) {
        if (isValueAll)
          return {
            ...state,
            [type]: {
              ...state[type],
              [subType]: [value],
            },
          };
        return {
          ...state,
          [type]: {
            ...state[type],
            [subType]: removeAllCatecory(
              updateInfo<string>(state[type][subType], value),
            ),
          },
        };
      }
      return state;
    });
  },
}));
