import { Circle, Star } from '@atoms/icon';
import Span from '@atoms/Span';

import TodayRecommendItem from '../TodayRecommendItem';
import $ from './style.module.scss';

function TodayRecommend() {
  return (
    <div className={$['today-recommend']}>
      <Circle className={$.circle} />
      <Star className={$.star} />
      <Span fontSize={20} isStrongFontFamily>
        오늘 추천하는 아이템 코디
      </Span>
      <TodayRecommendItem />
    </div>
  );
}

export default TodayRecommend;
