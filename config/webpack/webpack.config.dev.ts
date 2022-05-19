import { merge } from 'webpack-merge';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import fs from 'fs';
import path from 'path';
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
    server: {
      options: {
        key: fs.readFileSync(path.resolve('certs', 'localhost.key')),
        cert: fs.readFileSync(path.resolve('certs', 'localhost.crt')),
      },
      type: 'spdy',
    },
    proxy: {
      '/comments-api': {
        target: 'https://localhost:8083',
      },
      '/posts-api': {
        target: 'https://localhost:8081',
      },
      '/login': {
        target: 'https://localhost:8084',
      },
      '/logout': {
        target: 'https://localhost:8084',
      },
      '/oauth2': {
        target: 'https://localhost:8084',
      },
      '/user': {
        target: 'https://localhost:8084',
      },
    },
  },
};

export default (env: Record<string, unknown>): Configuration => merge(config, common({
  mode: 'development',
  hot: env.hot === true,
}));
