import { memo, useCallback, useEffect, useState } from 'react';

import { UploadStoreState } from '#types/storeType/upload';
import DialogModal from '@templates/DialogModal';

type Props = {
  isRemainState: boolean;
  clear: UploadStoreState['clearUpload'];
};

function ContinueWriteModal(modalProps: Props) {
  const { isRemainState, clear } = modalProps;
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (isRemainState) setDialogOpen(true);
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

export default memo(ContinueWriteModal);
