/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');

const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  sentry: {
    hideSourseMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

const bundleAnalyzer = withBundleAnalyzer({
  compress: true,
  webpack: (config) => {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
    };
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          modules: false,
        },
      },
    ],
  ],
  typescript: {
    ignoreBuildErrors: true, // TODO: 없애기
  },
  eslint: {
    ignoreDuringBuilds: true, // TODO: 없애기
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
      @import "src/styles/main.scss";
      @import "src/styles/_mixin.scss";
      @import "src/styles/_typography.scss";
      @import "src/styles/_grid.scss";
      @import "src/styles/_loading.scss";
    `,
  },
  env: {
    API_URL: process.env.API_URL,
    AI_API_URL: process.env.AI_API_URL,
    OAUTH_URL: process.env.OAUTH_URL,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI,
    OAUTH_STATE: process.env.OAUTH_STATE,
    OAUTH_SCOPE: process.env.OAUTH_SCOPE,
    CLIENT_URL: process.env.CLIENT_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    OAUTH_LOGOUT_URL: process.env.OAUTH_LOGOUT_URL,
    LOGOUT_REDIRECT_URI: process.env.LOGOUT_REDIRECT_URI,
    LOGOUT_CLIENT_ID: process.env.LOGOUT_CLIENT_ID,
    GA_ID: process.env.GA_ID,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'user-images.githubusercontent.com',
      'webserver0712.s3.ap-northeast-2.amazonaws.com',
      'ai-image-bucket.s3.amazonaws.com',
    ],
    imageSizes: [32, 48, 64, 96, 128, 256, 360],
    deviceSizes: [640, 768, 828, 1024, 1920],
  },
};

module.exports = withSentryConfig(
  withPlugins([nextConfig, bundleAnalyzer]),
  moduleExports,
  sentryWebpackPluginOptions,
);
