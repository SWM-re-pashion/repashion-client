export interface SearchState {
  keywords: string[];
  latestProducts: {
    id: number;
    img: string;
  }[];
}

export interface SearchStoreState extends SearchState {
  addKeyword: (value: string) => void;
  removeKeyword: (value: string) => void;
}
