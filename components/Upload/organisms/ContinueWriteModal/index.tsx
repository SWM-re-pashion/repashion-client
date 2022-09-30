import { memo, useCallback, useEffect, useState } from 'react';

import DialogModal from '@templates/DialogModal';
import { useUploadStore } from 'store/useUploadStore';

type Props = {
  isRemainState: boolean;
};

function ContinueWriteModal(modalProps: Props) {
  const { isRemainState } = modalProps;
  const [dialogOpen, setDialogOpen] = useState(false);
  const clearUpload = useUploadStore(
    useCallback((state) => state.clearUpload, []),
  );

  useEffect(() => {
    if (isRemainState) setDialogOpen(true);
  }, [isRemainState]);

  const handleCancel = useCallback(() => {
    clearUpload();
    setDialogOpen(false);
  }, [clearUpload]);

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

export default memo(ContinueWriteModal);
