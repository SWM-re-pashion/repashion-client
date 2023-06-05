import { useCallback, useEffect } from 'react';

import DialogModal from '@templates/DialogModal';
import useModal from 'src/hooks/useModal';
import { useUploadStore } from 'src/store/upload/useUploadStore';

import { useRouteChange, useUploadRemained } from './hooks';

function ContinueWriteModal() {
  const isRemained = useUploadRemained();
  useRouteChange(isRemained);
  const clear = useUploadStore((state) => state.clearUpload);
  const { isOpen, handleModalOpen, handleModalClose } = useModal();

  useEffect(() => {
    if (isRemained) handleModalOpen();
  }, []);

  const handleCancel = useCallback(() => {
    clear();
    handleModalClose();
  }, [clear, handleModalClose]);

  return (
    <DialogModal
      id="continue-writing"
      label="이어서 작성 여부 판단하기"
      title="작성 중인 상품이 있어요. 이어서 작성하시겠어요?"
      cancelText="아니요, 새로 작성할래요"
      clickText="네, 이어서 작성할래요"
      isVerticalBtn
      isOpen={isOpen}
      onCancel={handleCancel}
      onClick={handleModalOpen}
    />
  );
}

export default ContinueWriteModal;
