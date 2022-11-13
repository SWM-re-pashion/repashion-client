declare namespace res {
  type ProductDetail = {
    status: number;
    data: {
      isMe: boolean;
      isSoldOut: boolean;
      contact: string;
      sellerInfo: {
        userId: number;
        profileImg: string;
        nickname: string;
        image: string[];
      };
      basic: {
        title: string;
        classification: string;
        brand: string;
        productInfo: string;
        styleInfo: string;
      };
      sellerNotice: {
        condition: string;
        pollution: string;
        height: string;
        length: string;
        bodyShape: string;
        fit: string;
        purchaseTime: string;
        purchasePlace: string;
      };
      measure: {
        length: number;
        shoulderWidth: number;
        chestSection: number;
        sleeveLength: number;
        waistSection: number;
        thighSection: number;
        rise: number;
        bottomSection: number;
      };
      opinion: string;
      price: number;
      isIncludeDelivery: boolean;
      updatedAt: string;
      like: number;
      view: number;
    };
  };
  type ProductStatus = 'soldout' | 'sale' | 'reserve'; // TODO: 추후에 상품 상태 추가
}
