import { ClothesCategory, FilterInfo } from '#types/info';

export type FilterType = 'top' | 'bottom' | 'all';

export interface FilterState {
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

export type FilterUpdate = (
  value: string,
  type: keyof FilterInfo,
  subType?: keyof ClothesCategory,
) => void;

export interface FilterStoreState extends FilterState {
  filterUpdate: FilterUpdate;
  priceUpdate: (value: number, idx: number) => void;
  clear: (subType: FilterType) => void;
}
