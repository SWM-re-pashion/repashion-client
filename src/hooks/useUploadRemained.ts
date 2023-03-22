import { useUploadStore } from 'src/store/upload/useUploadStore';

export function useUploadRemained() {
  const { validation, style, isIncludeDelivery, basicInfo, sellerNote } =
    useUploadStore((state) => state);
  const clearUpload = useUploadStore((state) => state.clearUpload);
  const { imgList, price, size, contact } = validation;

  return {
    isRemained:
      imgList ||
      price ||
      size ||
      contact ||
      isIncludeDelivery ||
      !!style.color.length ||
      !!style.tag ||
      !!style.material ||
      !!basicInfo.title ||
      !!basicInfo.category.some((x) => !!x) ||
      !!basicInfo.brand ||
      Object.values(sellerNote).some((x) => !!x),
    clear: clearUpload,
  };
}
