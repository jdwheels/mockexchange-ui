import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import common from './webpack.config.common';

const config: Configuration & { devServer: DevServerConfiguration } = {
  devtool: 'eval-source-map',
  target: 'web',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].chunk.js',
  },
  devServer: {
    port: 3200,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
      },
      '/login': {
        target: 'http://localhost:8081',
      },
      '/x': {
        target: 'http://localhost:8081',
      },
      '/oauth2': {
        target: 'http://localhost:8081',
      },
      '/logout': {
        target: 'http://localhost:8081',
      },
      '/null': {
        target: 'http://localhost:8081',
      },
    },
  },
};

export default (env: Record<string, unknown>): Configuration => merge(config, common({
  mode: 'development',
  hot: env.hot === true,
}));
