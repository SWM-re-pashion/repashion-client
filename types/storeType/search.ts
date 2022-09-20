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
  addProduct: ({
    id: number,
    img: string,
  }: SearchState['latestProducts'][0]) => void;
  removeProduct: (value: number) => void;
}
