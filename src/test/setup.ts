// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';

global.mx = {
  env: {
    postsBaseUrl: '',
    commentsBaseUrl: '',
    loginBaseUrl: '',
    version: '',
    sha: '',
  },
};

afterEach(cleanup);
