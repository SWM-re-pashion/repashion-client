import { UploadState } from '#types/storeType/upload';

export const priceValidate = (price: UploadState['price']) => {
  return !!price;
};
