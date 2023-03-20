import { StyleUpload } from '#types/storeType/upload';

export const styleValidate = (values: StyleUpload) => {
  const colorValid = !!values.color.length;
  const tagValid = !!values.tag;
  const materialValid = !!values.material;
  return colorValid && tagValid && materialValid;
};
