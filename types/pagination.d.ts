export type Pagination<T> = {
  pagination: {
    isEndOfPage: boolean;
    pageNumber: number;
    totalItemCount: number;
    totalPageCount: number;
  };
  items: T[];
};
