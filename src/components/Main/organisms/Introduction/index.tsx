import { Star } from '@atoms/icon';
import { Bubble } from '@atoms/icon/Bubble';
import Span from '@atoms/Span';

import $ from './style.module.scss';

function Introduction() {
  return (
    <div className={$.introduction}>
      <Span fontSize={20} className={$.title}>
        re:Fashion
      </Span>
      <Span fontWeight={400} className={$.text}>
        AI 기반 <Span>추천 알고리즘</Span>을 통해 상하의 코디를 매칭하고 상품
        판매 시 <Span>AI 이미지 인식</Span>을 통해 의류를 분석하여 알찬 의류
        정보를 제공해주는 <Span>패션 리세일 마켓</Span>입니다.
      </Span>

      <Star fill="#b3ff85" size={50} className={$['green-star']} />
      <Bubble className={$.bubble} />
      <Star fill="#ff61d7" size={40} className={$['pink-star']} />
    </div>
  );
}

export default Introduction;
