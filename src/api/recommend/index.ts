import { Axios } from 'src/api/core';

type TodayRecommend = {
  status: number;
  data: res.RecommendProduct;
};

type ProductRecommend = {
  status: number;
  data: res.ProductSummary[];
};

export const getTodayRecommendItem = async (): Promise<TodayRecommend> => {
  const response = await Axios.get('/api/recommend/today');
  return response;
};

export const getProductRecommendItemList = async (
  id: string,
): Promise<ProductRecommend> => {
  const response = await Axios.get(`/api/recommend/${id}`);
  return response;
};
