import { useCallback, useEffect, useState } from 'react';

import DialogModal from '@templates/DialogModal';
import { useUploadStore } from 'src/store/upload/useUploadStore';

import { useRouteChange, useUploadRemained } from './hooks';

function ContinueWriteModal() {
  const isRemained = useUploadRemained();
  useRouteChange(isRemained);
  const clear = useUploadStore((state) => state.clearUpload);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (isRemained) setDialogOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    clear();
    setDialogOpen(false);
  }, [clear]);

  const handleClick = useCallback(() => setDialogOpen(false), []);

  return (
    <DialogModal
      id="continue-writing"
      label="이어서 작성 여부 판단하기"
      title="작성 중인 상품이 있어요. 이어서 작성하시겠어요?"
      cancelText="아니요, 새로 작성할래요"
      clickText="네, 이어서 작성할래요"
      isVerticalBtn
      isOpen={dialogOpen}
      onCancel={handleCancel}
      onClick={handleClick}
    />
  );
}

export default ContinueWriteModal;
