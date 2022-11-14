import Link from 'next/link';

import { SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';

import $ from './style.module.scss';

const RECOMMEND_URL = '/shop?category=3999&order=view';

function RecommendListHeader() {
  return (
    <div className={$['codi-list']}>
      <h2>추천 코디 리스트</h2>
      <Link href={RECOMMEND_URL}>
        <button
          type="button"
          aria-label="구경하러가기 버튼"
          className={$['look-around']}
        >
          <Span fontWeight={600} fontSize={13}>
            구경하러가기
          </Span>
          <SelectArrow className={$.arrow} />
        </button>
      </Link>
    </div>
  );
}

export default RecommendListHeader;
