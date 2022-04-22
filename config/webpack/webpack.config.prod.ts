import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { merge } from 'webpack-merge';
import common from './webpack.config.common';

export default merge(common({ mode: 'production' }), {
  target: 'browserslist',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  devtool: false,
  optimization: {
    minimize: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
});
