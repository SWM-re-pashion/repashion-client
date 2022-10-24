declare namespace res {
  type OAuth = {
    status: number;
    data: {
      accessToken: string;
      hasPreference: boolean;
    };
  };
  type reissue = {
    status: number;
    data: {
      accessToken: string;
    };
  };
}

declare namespace req {
  type OAuth = {
    authCode: string;
  };
}
