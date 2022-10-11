export const queryKey = {
  category: (isExcluded: boolean) => {
    return [isExcluded ? 'excludedCategory' : 'category'];
  },
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['productItemList', { ...requestParams }];
  },
  productDetail: (id: string) => {
    return ['product', id];
  },
};
