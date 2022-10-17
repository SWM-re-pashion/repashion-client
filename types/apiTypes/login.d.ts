declare namespace res {
  type OAuth = {
    status: number;
    data: {
      accesToken: string;
      refreshToken: string;
    };
  };
}

declare namespace req {
  type OAuth = {
    authCode: string;
  };
}
