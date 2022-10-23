import { memo, useCallback, useEffect, useState } from 'react';

import DialogModal from '@templates/DialogModal';

export type ImgResult = 'success' | 'error' | null;

type Props = {
  isLoading: boolean;
  resultType: ImgResult;
};

function ImgResultModal(modalProps: Props) {
  const { isLoading, resultType } = modalProps;
  const [dialogOpen, setDialogOpen] = useState(false);
  const titleText = `이미지 인식에 ${
    resultType === 'success' ? '성공' : '실패'
  }했습니다.`;

  const contentText =
    resultType === 'success'
      ? '스타일 정보(태그, 컬러, 소재) 아이템 기본 정보(카테고리)가 성공적으로 인식되었습니다.\n\n인식 결과가 예상과 다르다면 직접 수정해주세요.'
      : '이미지 인식에 성공하는 경우 스타일 정보(태그, 컬러, 소재) 아이템 기본 정보(카테고리)를 자동으로 채워줍니다.\n\n이미지 인식을 원하는 경우 다른 사진을 올려주세요. 혹은 직접 수정해주세요.';

  useEffect(() => {
    if (!isLoading && resultType) setDialogOpen(true);
  }, [resultType, isLoading]);

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
