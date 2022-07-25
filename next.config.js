/** @type {import('next').NextConfig} */
import { join } from 'path';

const nextConfig = {
  reactStrictMode: true,
  presets: [['next/babel']],
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    prependData: '@import "styles/main.scss"; @import "styles/_mixin.scss";',
  },
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    API_URL: process.env.API_URL,
    REST_API_KEY: process.env.REST_API_KEY,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'user-images.githubusercontent.com',
      'webserver0712.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
