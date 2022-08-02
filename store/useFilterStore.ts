import { FilterStoreState } from '#types/storeType/filter';
import { FilterInfo, ClothesCategory } from 'types/info';
import { updateInfo, deepClone } from 'utils';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { filterCommonState, filterInitialState } from './constants';

export const useFilterStore = create(
  persist<FilterStoreState>(
    (set) => ({
      ...filterInitialState,
      priceUpdate: (value: number, idx: number) => {
        set((state) => {
          const toBeModified: [number, number] = [...state.price];
          toBeModified[idx] = value;
          return { ...state, price: toBeModified };
        });
      },

      clear: (subType: string) => {
        const remain = subType === 'bottom' ? 'top' : 'bottom';
        const current = subType === 'outer' ? 'top' : subType;

        set((state) => {
          if (subType === 'all')
            return {
              ...state,
              ...deepClone(filterCommonState),
            };
          return {
            ...deepClone(filterCommonState),
            colors: {
              [remain]: [...state.colors[remain]],
              [current]: [],
            },
            fit: {
              [remain]: [...state.fit[remain]],
              [current]: [],
            },
            length: {
              [remain]: [...state.length[remain]],
              [current]: [],
            },
            size: {
              [remain]: [...state.size[remain]],
              [current]: [],
            },
          };
        });
      },

      filterUpdate: (
        type: keyof FilterInfo,
        value: string,
        subType?: keyof ClothesCategory,
      ) => {
        set((state) => {
          const removeAllCatecory = (arr: string[]) =>
            arr.filter((x) => x !== 'all');
          const isValueAll = typeof value === 'string' && value === 'all';

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
    }),
    {
      name: 'filter-storage',
    },
  ),
);
