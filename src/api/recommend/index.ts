import { Axios } from 'src/api/core';

type TodayRecommend = {
  status: number;
  data: res.RecommendProduct;
};

export const getTodayRecommendItem = async (): Promise<TodayRecommend> => {
  const response = await Axios.get('/api/recommend/today');
  return response;
};
