import { SearchStoreState } from '#types/storeType/search';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { initialSearchState } from './constants';

export const useSearchStore = create(
  persist<SearchStoreState>((set) => ({
    ...initialSearchState,
    addKeyword: (value: string) => {
      set((state) => {
        const copy = [...state.keywords];
        if (state.keywords.length === 10) copy.shift();
        copy.push(value);
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
  })),
);
