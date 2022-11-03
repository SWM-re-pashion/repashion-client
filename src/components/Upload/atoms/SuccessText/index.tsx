import React from 'react';

import { recognitionResult } from '#types/upload';
import Span from '@atoms/Span';

type Props = Omit<recognitionResult, 'state'>;

function SuccessText(props: Props) {
  const { tag, color, material, category } = props;
  return (
    <Span fontWeight={500}>
      스타일: <Span fontWeight={700}>{tag}</Span>
      <br />
      컬러: <Span fontWeight={700}>{color}</Span>
      <br /> 소재: <Span fontWeight={700}>{material}</Span>
      <br />
      카테고리: <Span fontWeight={700}>{category}</Span>가 성공적으로
      인식되었습니다.
      <br />
      <br />
      인식 결과가 예상과 다르다면 입력 항목을 직접 수정해주세요.
    </Span>
  );
}
export default SuccessText;
