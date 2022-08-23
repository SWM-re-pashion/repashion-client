declare namespace res {
  type Preference = {
    staus: number;
    style: string;
  };
  type StyleImgs = {
    status: number;
    data: {
      styles: { id: number; src: string; alt: string }[];
    };
  };
}

declare namespace req {
  type Preference = {
    styles: number[];
    gender: string;
    height: number;
    bodyShape: string;
    topSize: string[];
    bottomSize: string[];
    topColor: string[];
    bottomColor: string[];
  };
}
