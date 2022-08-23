/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  presets: [['next/babel']],
  typescript: {
    ignoreBuildErrors: true, // Todo: 없애기
  },
  eslint: {
    ignoreDuringBuilds: true, // Todo: 없애기
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData:
      '@import "styles/main.scss"; @import "styles/_mixin.scss"; @import "styles/_typography.scss"; @import "styles/_grid.scss";',
  },
  env: {
    API_URL: process.env.API_URL,
    AI_API_URL: process.env.AI_API_URL,
    KAKAO_OAUTH_URL: process.env.KAKAO_OAUTH_URL,
    GOOGLE_OAUTH_URL: process.env.GOOGLE_OAUTH_URL,
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
