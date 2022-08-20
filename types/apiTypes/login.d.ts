declare namespace res {
  type OAuth = {
    social: {
      id: string;
      token: string;
    };
  };
}

declare namespace req {
  type OAuth = {
    user: {
      ageRange: string;
      email: string;
      nickName: string;
      profileImage: string;
      thumbnailImage: string;
    };
    status: 'string';
  };
}
