import { UploadTemplateWithCategory } from '#types/upload';
import ErrorMsg from '@atoms/ErrorMsg';
import { sizeData } from '@constants/upload/utils';
import InfoBtnBox from '@organisms/InfoBtnBox';
import { getMainCategory } from 'src/api/category';
import useUploadFormValidate from 'src/hooks/useUploadFormValidate';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import { sizeValidate } from './validate';

type Props = {
  sizes: res.KindStaticData;
} & UploadTemplateWithCategory;

function SizeInfo(infoProps: Props) {
  const { isUpdate, categoryData, sizes } = infoProps;
  const useStore = useUploadUpdateStore(isUpdate);
  const state = useStore((states) => states.size);
  const category = useStore((states) => states.basicInfo.category);
  const onChange = useStore((states) => states.updateUpload);
  const isSizeValid = sizeValidate(state);
  const sizeProps = sizeData(getMainCategory(categoryData, category), sizes);
  useUploadFormValidate({ isUpdate, isValid: isSizeValid, type: 'size' });

  return (
    <InfoBtnBox
      {...sizeProps}
      compareData={state}
      handleFunc={onChange}
      error={<ErrorMsg isValid={isSizeValid} msg="사이즈를 선택해주세요." />}
    />
  );
}

export default SizeInfo;
