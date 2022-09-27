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
    order?: string; // TODO: order는 필수값으로 수정할 것
    hide_sold?: string;
    style?: string | null;
    price_goe?: string | null;
    price_loe?: string | null;
    color?: string | null;
    fit?: string | null;
    length?: string | null;
    clothes_size?: string | null;
  };
}
