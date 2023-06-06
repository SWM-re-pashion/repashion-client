import { ClothesCategory } from '#types/info';

export type FilterType = 'top' | 'bottom' | 'all';

export interface FilterState {
  style: string[];
  color: {
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
  clothesSize: {
    top: string[];
    bottom: string[];
  };
  price: [number, number];
}

export type FilterUpdate = (
  value: string,
  type: keyof Omit<FilterState, 'price'>,
  subType?: keyof ClothesCategory,
) => void;

export interface FilterStoreState extends FilterState {
  initState: (state: FilterState) => void;
  filterUpdate: FilterUpdate;
  priceUpdate: (value: number, idx: number) => void;
  clear: (subType: FilterType) => void;
}
