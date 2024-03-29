// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />

declare namespace NodeJS {
  interface IProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;

  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };

  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };

  export default classes;
}

interface MxEnv {
  postsBaseUrl: string;
  commentsBaseUrl: string;
  loginBaseUrl: string;
  version: string;
  sha: string;
}

declare namespace mx {
  const env: MxEnv;
}
