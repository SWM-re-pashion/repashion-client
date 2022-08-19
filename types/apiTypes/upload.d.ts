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
