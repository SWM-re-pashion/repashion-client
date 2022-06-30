const REDIRECT_URI = 'http://localhost:3001';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
export { REDIRECT_URI, KAKAO_AUTH_URL };
