/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  presets: [['next/babel']],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData:
      '@import "styles/main.scss"; @import "styles/_mixin.scss"; @import "styles/_typography.scss"; @import "styles/_grid.scss";',
  },
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    API_URL: process.env.API_URL,
    AI_API_URL: process.env.AI_API_URL,
    REST_API_KEY: process.env.REST_API_KEY,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'user-images.githubusercontent.com',
      'webserver0712.s3.ap-northeast-2.amazonaws.com',
      'ai-image-bucket.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
