import { FilterStoreState, FilterType } from '#types/storeType/filter';
import { updateInfo, deepClone } from 'src/utils';
import create from 'zustand';

import { filterCommonState, filterInitialState } from './constants';

export const useFilterStore = create<FilterStoreState>((set) => ({
  ...filterInitialState,
  priceUpdate: (value: number, idx: number) => {
    set((state) => {
      const toBeModified: [number, number] = [...state.price];
      toBeModified[idx] = value;
      return { ...state, price: toBeModified };
    });
  },

  clear: (subType: FilterType) => {
    const remain = subType === 'bottom' ? 'top' : 'bottom';

    set((state) => {
      if (subType === 'all')
        return {
          ...state,
          ...deepClone(filterCommonState),
        };
      return {
        ...deepClone(filterCommonState),
        color: {
          [remain]: [...state.color[remain]],
          [subType]: [],
        },
        fit: {
          [remain]: [...state.fit[remain]],
          [subType]: [],
        },
        length: {
          [remain]: [...state.length[remain]],
          [subType]: [],
        },
        clothesSize: {
          [remain]: [...state.clothesSize[remain]],
          [subType]: [],
        },
      };
    });
  },

  filterUpdate: (value, type, subType?) => {
    set((state) => {
      const removeAllCatecory = (arr: string[]) =>
        arr.filter((x) => x !== 'all');
      const isValueAll = typeof value === 'string' && value === 'all';

      if (type === 'style') {
        if (type === 'style' && isValueAll)
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
