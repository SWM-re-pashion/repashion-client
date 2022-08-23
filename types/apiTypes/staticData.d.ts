declare namespace res {
  type KindStaticData = {
    staus: number;
    data: {
      top: { name: string; code: string }[];
      bottom: { name: string; code: string }[];
    };
  };
  type StaticData = {
    staus: number;
    data: { name: string; code: string }[];
  };
}
