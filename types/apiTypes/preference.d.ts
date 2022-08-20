declare namespace res {
  type Preference = {
    staus: number;
    style: string;
  };
}

declare namespace req {
  type Preference = {
    styles: number[];
    gender: string;
    height: string;
    bodyShape: string;
    topSize: string[];
    bottomSize: string[];
    topColor: string[];
    bottomColor: string[];
  };
}
