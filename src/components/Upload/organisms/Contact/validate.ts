import { UploadState } from '#types/storeType/upload';

export const contactValidate = (contact: UploadState['contact']) => {
  return !!contact;
};
