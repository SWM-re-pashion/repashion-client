declare namespace res {
  type Profile = {
    status: number;
    data: {
      name: string;
      profileImage: string;
      totalCount: number;
      email: string;
    };
  };
  type UpdateMyInfo = {
    status: number;
    data: number;
  };
}

declare namespace req {
  type UpdateMyInfo = FormData;
}
