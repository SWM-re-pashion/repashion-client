declare namespace res {
  type ImgUpload = {
    error: boolean;
    image: string[];
    attribute: {
      style: string;
      gender: string;
      mainCategory: string;
      subCategory: string;
      material: string;
      detail: string;
      print: string;
    };
  };
}

declare namespace res {
  type uploadData = {
    status: number;
    data: number;
  };
}

declare namespace req {
  type sellerNote = {
    condition: string;
    pollution: string;
    height: number;
    bodyShape: string;
    length: string;
    fit: string;
  };
  type uploadData = {
    imgList: string[];
    style: { tag: string; color: string; material: string };
    price: number;
    isIncludeDelivery: boolean;
    basicInfo: {
      title: string;
      category: string;
      brand: string;
    };
    size: string;
    sellerNote: sellerNote;
    measure: {
      [key: string]: number;
    };
    additionalInfo: { purchaseTime: string; purchasePlace: string };
    opinion: string;
  };
}
