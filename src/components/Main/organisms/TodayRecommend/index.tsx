import ErrorFallback from '@atoms/ErrorFallback';
import { Circle, Star } from '@atoms/icon';
import Span from '@atoms/Span';
import AsyncBoundary from '@templates/AsyncBoundary';
import { RecommendItemSkeleton } from 'src/components/Shop/Organisms/ProductItemList/Skeleton';

import TodayRecommendItem from '../TodayRecommendItem';
import $$ from '../TodayRecommendItem/style.module.scss';
import $ from './style.module.scss';

function TodayRecommend() {
  return (
    <div className={$['today-recommend']}>
      <Circle className={$.circle} />
      <Star className={$.star} />
      <Span fontSize={20} isStrongFontFamily>
        오늘 추천하는 아이템 코디
      </Span>

      <AsyncBoundary
        suspenseFallback={
          <RecommendItemSkeleton isRecommend className={$$.item} />
        }
        errorFallback={ErrorFallback}
      >
        <TodayRecommendItem />
      </AsyncBoundary>
    </div>
  );
}

export default TodayRecommend;
