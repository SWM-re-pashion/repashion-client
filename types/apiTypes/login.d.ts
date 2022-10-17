declare namespace res {
  type OAuth = {
    status: number;
    data: {
      accesToken: string;
      refreshToken: string;
    };
  };
  type reissue = {
    status: number;
    data: string;
  };
}

declare namespace req {
  type OAuth = {
    authCode: string;
  };
}
