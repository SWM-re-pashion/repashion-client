import { UploadState } from '#types/storeType/upload';

export const basicValidate = (basic: UploadState['basicInfo']) => {
  const titleValid = !!basic.title;
  const categoryValid = !!basic.category.every((x) => !!x);
  const brandValid = !!basic.brand;
  return titleValid && categoryValid && brandValid;
};
