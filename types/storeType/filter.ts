import { ClothesCategory, FilterInfo } from '#types/info';
import { State } from 'zustand';

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

export interface FilterStoreState extends FilterState {
  filterUpdate: (
    type: keyof FilterInfo,
    value: string,
    subType?: keyof ClothesCategory,
  ) => void;
  priceUpdate: (value: number, idx: number) => void;
  clear: (subType: string) => void;
}
