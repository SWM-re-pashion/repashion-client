import { memo, useEffect } from 'react';

import { recognitionResult } from '#types/upload';
import DialogModal from '@templates/DialogModal';
import useModal from 'src/hooks/useModal';

import FailText from '../../atoms/FailText';
import SuccessText from '../../atoms/SuccessText';

type Props = {
  isLoading: boolean;
  result: recognitionResult;
};

function ImgResultModal(modalProps: Props) {
  const { isLoading, result } = modalProps;
  const { state, tag, color, material, category } = result;
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const titleText = `이미지 인식에 ${
    state === 'failed' ? '실패' : '성공'
  }했습니다.`;

  const contentText =
    state === 'success' ? (
      <SuccessText {...{ tag, color, material, category }} />
    ) : (
      <FailText />
    );

  useEffect(() => {
    if (!isLoading && state && state !== 'error') handleModalOpen();
  }, [result, isLoading, state]);

  return (
    <DialogModal
      id="img-upload-result"
      label={titleText}
      title={titleText}
      content={contentText}
      clickText="닫기"
      isVerticalBtn
      isOpen={isOpen}
      onClick={handleModalClose}
    />
  );
}

export default memo(ImgResultModal);
