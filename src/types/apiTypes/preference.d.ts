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
    // TODO: 서비스 고도화 전까지 styles 데이터 주석
    // styles: number[];
    gender: string;
    height: number;
    bodyShape: string;
    topSize: string;
    bottomSize: string;
    topColors: string;
    bottomColors: string;
  };
}
