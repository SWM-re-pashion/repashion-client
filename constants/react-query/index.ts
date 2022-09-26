export const queryKey = {
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    const { category, order, hideSold } = requestParams;
    return ['productItemList', category, order, hideSold];
  },
};
