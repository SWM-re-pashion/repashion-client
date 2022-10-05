import { UploadState } from '#types/storeType/upload';

const judgeValid = (states: UploadState) => {
  const { imgList, style, price, isIncludeDelivery, basicInfo } = states;
  const { size, sellerNote } = states;
  const { title, category, brand } = basicInfo;
  const imgListValid = !!imgList.length;
  const colorValid = !!style.color.length;
  const tagValid = !!style.tag;
  const materialValid = !!style.material;
  const priceValid = !!price;
  const deliveryValid = isIncludeDelivery;
  const titleValid = !!title;
  const categoryValid = !!category.every((x) => !!x);
  const categorySomeValid = !!category.some((x) => !!x);
  const brandValid = !!brand;
  const sellerValid = Object.values(sellerNote).every((x) => !!x);
  const sellerSomeValid = Object.values(sellerNote).some((x) => !!x);
  const sizeValid = !!size;

  return {
    isRemainState:
      imgListValid ||
      colorValid ||
      tagValid ||
      materialValid ||
      priceValid ||
      deliveryValid ||
      titleValid ||
      categorySomeValid ||
      brandValid ||
      sellerSomeValid ||
      sizeValid,
    isFormValid:
      imgListValid &&
      colorValid &&
      tagValid &&
      materialValid &&
      priceValid &&
      deliveryValid &&
      titleValid &&
      categoryValid &&
      brandValid &&
      sellerValid &&
      sizeValid,
    isImgValid: imgListValid,
    isStyleValid: colorValid && tagValid && materialValid,
    isPriceValid: priceValid,
    isBasicValid: titleValid && categoryValid && brandValid,
    isSellerValid: sellerValid,
    isSizeValid: sizeValid,
  };
};

export { judgeValid };
