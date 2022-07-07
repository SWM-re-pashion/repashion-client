/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  presets: [['next/babel']],
  env: {
    KAKAO_KEY: process.env.KAKAO_KEY,
    API_URL: process.env.API_URL,
    REST_API_KEY: process.env.REST_API_KEY,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
