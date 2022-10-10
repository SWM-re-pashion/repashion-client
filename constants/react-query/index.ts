export const queryKey = {
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['productItemList', { ...requestParams }];
  },
  productDetail: (id: string) => {
    return ['product', id];
  },
};
