import RecommendItemView from 'src/components/Shop/Organisms/ProductItemList/RecommendItem.view';
import { useTodayRecommendItem } from 'src/hooks/api/recommend';

import $ from './style.module.scss';

function TodayRecommendItem() {
  const { data } = useTodayRecommendItem();

  if (!data) return null;
  const todayData = data.data;

  return <RecommendItemView item={{ ...todayData }} className={$.item} />;
}

export default TodayRecommendItem;
