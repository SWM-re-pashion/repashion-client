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
  export type RecommendFeed = {
    data: Pagination<res.RecommendProduct>;
    status: number;
  };

  export type RecommendClothesType = 'top' | 'bottom';

  export type ProductSummary = {
    id: number;
    img: string;
    title: string;
    size: string;
    like: number;
    price: number;
    isSoldOut: boolean;
    updatedAt: string;
    type?: RecommendClothesType;
  };

  export type RecommendProduct = {
    id: number;
    product: {
      type: RecommendClothesType;
    } & ProductSummary;
    associatedProduct: {
      type: RecommendClothesType;
    } & ProductSummary;
  };
}

declare namespace req {
  export type ShopFeed = {
    page: number;
    size: number;
    value?: string;
    category?: string;
    order?: string; // TODO: order는 필수값으로 수정할 것
    hideSold?: string;
    style?: string;
    priceGoe?: string;
    priceLoe?: string;
    color?: string;
    fit?: string;
    length?: string;
    clothesSize?: string;
    status?: string;
  };
}
