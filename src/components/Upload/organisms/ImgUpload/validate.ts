import { UploadState } from '#types/storeType/upload';

export const imgListValidate = (imgList: UploadState['imgList']) => {
  return !!imgList.length;
};
