import React from 'react';

import Span from '@atoms/Span';

function FailText() {
  return (
    <Span fontWeight={500}>
      이미지 인식에 성공하는 경우 스타일 정보(태그, 컬러, 소재) 아이템 기본
      정보(카테고리)를 자동으로 채워줍니다.
      <br />
      <br />
      이미지 인식을 원하는 경우 다른 사진을 올려주세요. 혹은 입력 항목을 직접
      수정해주세요.
    </Span>
  );
}
export default FailText;
