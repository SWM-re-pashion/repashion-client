import { UploadState } from '#types/storeType/upload';

export const sizeValidate = (size: UploadState['size']) => {
  return !!size;
};
