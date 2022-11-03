import { memo, useCallback, useEffect, useState } from 'react';

import DialogModal from '@templates/DialogModal';

export type recognitionResult = {
  state?: 'success' | 'failed' | 'error';
  category?: string;
  tag?: string;
  color?: string;
  material?: string;
};

type Props = {
  isLoading: boolean;
  result: recognitionResult;
};

function ImgResultModal(modalProps: Props) {
  const { isLoading, result } = modalProps;
  const { state, tag, color, material, category } = result;
  const [dialogOpen, setDialogOpen] = useState(false);
  const titleText = `이미지 인식에 ${
    state === 'failed' ? '실패' : '성공'
  }했습니다.`;

  const failText =
    '이미지 인식에 성공하는 경우 스타일 정보(태그, 컬러, 소재) 아이템 기본 정보(카테고리)를 자동으로 채워줍니다.\n\n이미지 인식을 원하는 경우 다른 사진을 올려주세요. 혹은 입력 항목을 직접 수정해주세요.';
  const successText = `스타일 정보(태그: ${tag}, 컬러: ${color}, 소재: ${material})\n 아이템 기본 정보(카테고리: ${category})가 성공적으로 인식되었습니다.\n\n인식 결과가 예상과 다르다면 입력 항목을 직접 수정해주세요.`;
  const contentText = state === 'success' ? successText : failText;

  useEffect(() => {
    if (!isLoading && state && state !== 'error') setDialogOpen(true);
  }, [result, isLoading, state]);

  const handleClick = useCallback(() => setDialogOpen(false), []);

  return (
    <DialogModal
      id="img-upload-result"
      label={titleText}
      title={titleText}
      content={contentText}
      clickText="닫기"
      isVerticalBtn
      isOpen={dialogOpen}
      onClick={handleClick}
    />
  );
}

export default memo(ImgResultModal);
