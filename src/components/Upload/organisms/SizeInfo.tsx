import { memo } from 'react';

import { UpdateUpload } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import { sizeBtnBox } from '@constants/upload/utils';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { useUploadStore } from 'src/store/upload/useUploadStore';

type Props = {
  sizeProps: sizeBtnBox;
  onChange: UpdateUpload;
  isSizeValid: boolean;
};

function SizeInfo(infoProps: Props) {
  const { sizeProps, onChange, isSizeValid } = infoProps;
  const state = useUploadStore((states) => states.size);
  return (
    <InfoBtnBox
      {...sizeProps}
      compareData={state}
      handleFunc={onChange}
      error={<ErrorMsg isValid={isSizeValid} msg="사이즈를 선택해주세요." />}
    />
  );
}

export default memo(SizeInfo);
