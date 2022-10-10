declare namespace res {
  type ProductDetail = {
    status: number;
    data: {
      isMe: boolean;
      status: string;
      sellerInfo: {
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
        bodyForm: string;
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
      views: number;
    };
  };
  type ProductDeleteError = {
    message: string;
    status: number;
    errors: string[];
    code: string;
  };
}
