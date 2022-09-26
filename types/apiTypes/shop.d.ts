declare namespace res {
  export type Pagination<T> = {
    pagination: {
      isEndOfPage: boolean;
      pageNumber: number;
      totalItemCount: number;
      totalPageCount: number;
    };
    items: T[];
  };
  export type ShopFeed = {
    data: Pagination<res.ProductSummary>;
    status: number;
  };

  export type ProductSummary = {
    id: number;
    img: string;
    title: string;
    size: string;
    like: number;
    price: number;
    isSoldOut: boolean;
    updatedAt: string;
  };
}

declare namespace req {
  export type ShopFeed = {
    page: number;
    size: number;
    category?: string;
    order?: string;
    hideSold?: string;
  };
}
