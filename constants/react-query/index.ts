export const queryKey = {
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['productItemList', ...Object.values(requestParams)];
  },
};
