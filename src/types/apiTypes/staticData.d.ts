declare namespace req {
  type StaticType =
    | 'Color'
    | 'Fit'
    | 'Gender'
    | 'Length'
    | 'Size'
    | 'Style'
    | 'BodyShape'
    | 'PollutionCondition';
}

declare namespace res {
  type KindStaticData = {
    status: number;
    data: {
      top: { name: string; code: string }[];
      bottom: { name: string; code: string }[];
    };
  };
  type StaticData = {
    status: number;
    data: { name: string; code: string }[];
  };
}
