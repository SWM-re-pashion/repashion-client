import axios from 'lib/axios';

export type OAuthRequest = {
  social: {
    id: string;
    token: string;
  };
};

export type OAuthResponse = {
  user: {
    ageRange: string;
    email: string;
    nickName: string;
    profileImage: string;
    thumbnailImage: string;
  };
  status: 'string';
};

export const postAuthToken = async (token: string): Promise<OAuthResponse> => {
  const requestData: OAuthRequest = {
    social: {
      id: 'kakao',
      token,
    },
  };
  const { data } = await axios.post<OAuthResponse>(
    '/api/kakao/login',
    JSON.stringify(requestData),
  );

  return data;
};
