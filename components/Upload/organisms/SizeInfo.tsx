import { memo } from 'react';

import { UpdateUpload, UploadState } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import { sizeBtnBox } from '@constants/upload/utils';
import InfoBtnBox from '@organisms/InfoBtnBox';

type Props = {
  sizeProps: sizeBtnBox;
  state: UploadState['size'];
  onChange: UpdateUpload;
  isSizeValid: boolean;
};

function SizeInfo(infoProps: Props) {
  const { sizeProps, state, onChange, isSizeValid } = infoProps;
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
