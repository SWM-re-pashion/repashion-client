/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  presets: [['next/babel']],
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    REDIRECT_URI: process.env.REDIRECT_URI,
    REST_API_KEY: process.env.REST_API_KEY,
  },
};

module.exports = nextConfig;
