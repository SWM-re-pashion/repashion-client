declare namespace res {
  type OAuth = {
    status: number;
    data: {
      accessToken: string;
      refreshToken: string;
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
