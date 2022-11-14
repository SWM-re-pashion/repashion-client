export const queryKey = {
  myInfo: ['myInfo'],
  styleImgs: ['styleImgs'],
  todayRecommend: ['todayRecommend'],
  userInfo: (id: string) => {
    return ['userInfo', id];
  },
  staticData: (kind: req.StaticType) => {
    return ['staticData', kind];
  },
  category: (isExcluded: boolean) => {
    return [isExcluded ? 'excludedCategory' : 'category'];
  },
  productItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['productItemList', { ...requestParams }];
  },
  recommendItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['recommendItemList', { ...requestParams }];
  },
  myItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['myItemList', { ...requestParams }];
  },
  productDetail: (id: string) => {
    return ['product', id];
  },
  uploadedProduct: (id: string) => {
    return ['uploadedProduct', id];
  },
  searchingItemList: (requestParams: Omit<req.ShopFeed, 'page' | 'size'>) => {
    return ['searchingProductItemList', { ...requestParams }];
  },
};

export const QUERY_DAYTIME = 1000 * 60 * 60 * 24;
export const QUERY_WEEKTIME = 1000 * 60 * 60 * 24 * 7;
