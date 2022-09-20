import { SearchStoreState } from '#types/storeType/search';
import { deepClone } from 'utils';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { initialSearchState } from './constants';

export const useSearchStore = create(
  persist<SearchStoreState>(
    (set) => ({
      ...initialSearchState,
      addKeyword: (value: string) => {
        set((state) => {
          const copy = [...state.keywords];
          const isNotExist =
            copy.find((x: string) => x === value) === undefined;
          if (state.keywords.length === 10 && isNotExist) copy.shift();
          if (isNotExist) copy.push(value);
          return { keywords: copy };
        });
      },
      removeKeyword: (value: string) => {
        set((state) => {
          const copy = [...state.keywords];
          const index = copy.findIndex((x: string) => x === value);
          if (index !== -1) copy.splice(index, 1);
          return { keywords: copy };
        });
      },
      addProduct: (product) => {
        set((state) => {
          const copy = deepClone(state.latestProducts);
          const isNotExist =
            copy.find(
              (x: SearchStoreState['latestProducts'][0]) => x.id === product.id,
            ) === undefined;
          if (state.latestProducts.length === 10 && isNotExist) copy.shift();
          if (isNotExist) copy.push(product);
          return { latestProducts: copy };
        });
      },
      removeProduct: (value: number) => {
        set((state) => {
          const copy = deepClone(state.latestProducts);
          const index = copy.findIndex(
            (x: SearchStoreState['latestProducts'][0]) => x.id === value,
          );
          if (index !== -1) copy.splice(index, 1);
          return { latestProducts: copy };
        });
      },
    }),
    {
      name: 'latest-storage',
    },
  ),
);
