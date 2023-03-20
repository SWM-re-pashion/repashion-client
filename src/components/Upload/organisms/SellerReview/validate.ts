import { UploadState } from '#types/storeType/upload';

export const sellerReviewValidate = (sellerNote: UploadState['sellerNote']) => {
  return Object.values(sellerNote).every((x) => !!x);
};
