import { memo, useEffect } from 'react';

import { UpdateUpload } from '#types/storeType/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import { sizeBtnBox } from '@constants/upload/utils';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { useUploadStore } from 'src/store/upload/useUploadStore';

import { sizeValidate } from './validate';

type Props = {
  sizeProps: sizeBtnBox;
  onChange: UpdateUpload;
};

function SizeInfo(infoProps: Props) {
  const { sizeProps, onChange } = infoProps;
  const state = useUploadStore((states) => states.size);
  const updateValidate = useUploadStore((states) => states.updateValidate);
  const isSizeValid = sizeValidate(state);

  useEffect(() => {
    updateValidate('size', isSizeValid);
  }, [isSizeValid, updateValidate]);

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
