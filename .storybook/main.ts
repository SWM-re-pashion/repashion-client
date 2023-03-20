const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  reactOptions: {
    fastRefresh: true,
  },
  webpackFinal: async (baseConfig) => {
    const nextConfig = require('../next.config.js');

    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      src: path.resolve(__dirname, '../src'),
      public: path.resolve(__dirname, '../public'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '#types': path.resolve(__dirname, '../src/types'),
      '@mocks': path.resolve(__dirname, '../__mocks__'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@atoms': path.resolve(__dirname, '../src/components/shared/atoms'),
      '@molecules': path.resolve(
        __dirname,
        '../src/components/shared/molecules',
      ),
      '@organisms': path.resolve(
        __dirname,
        '../src/components/shared/organisms',
      ),
      '@templates': path.resolve(
        __dirname,
        '../src/components/shared/templates',
      ),
      'next/router': require.resolve('./next/router.js'),
      'next/link': require.resolve('./next/link.js'),
      'next/image': require.resolve('./next/image.js'),
    };

    baseConfig.module.rules.push({
      test: /\.s[ac]ss$/i,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: [path.appSrc + '/src'],
            },
            additionalData: `
              @import "src/styles/main.scss";
              @import "src/styles/globals.scss";
              @import "src/styles/_mixin.scss";
              @import "src/styles/_typography.scss";
              @import "src/styles/_grid.scss";
              @import "src/styles/_loading.scss";
            `,
          },
        },
      ],
    });
    // merge whatever from nextConfig into the webpack config storybook will use
    return {
      ...baseConfig,
      ...nextConfig,
    };
  },
};
