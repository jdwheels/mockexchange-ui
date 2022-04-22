import path from 'path';
import webpack, { Configuration, WebpackPluginInstance } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

dotenv.config();

interface CommonOptions {
  mode?: Configuration['mode'];
  hot?: boolean
}

export default ({
  mode = 'production',
  hot = false,
}: CommonOptions): Configuration => {
  const isProduction = mode === 'production';
  const plugins: WebpackPluginInstance[] = [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: isProduction,
        minifyCSS: isProduction,
        minifyURLs: isProduction,
      },
    }),
    new CopyPlugin({
      patterns: ['public/env.js'],
    }),
  ];

  if (!isProduction && hot) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  const styleLoaders = (options = {}) => [
    {
      loader: isProduction
        ? MiniCssExtractPlugin.loader
        : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        ...options,
      },
    },
  ];

  return {
    mode,
    entry: './src/index',
    output: {
      path: path.resolve('dist'),
      // publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.[jt]sx?$/,
              loader: 'babel-loader',
              options: { compact: isProduction },
              include: /src/,
            },
            {
              test: /\.css$/,
              use: styleLoaders(),
              include: /src/,
            },
            {
              test: /\.module\.scss$/,
              use: [
                ...styleLoaders(
                  {
                    importLoaders: 1,
                    modules: true,
                  },
                ),
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true },
                },
              ],
              include: /src/,
            },
            {
              test: /\.scss$/,
              use: [
                ...styleLoaders(
                  { importLoaders: 1 },
                ),
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true },
                },
              ],
              include: /src/,
            },
          ],
        },
      ],
    },
    plugins,
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '...',
      ],
    },
  };
};
