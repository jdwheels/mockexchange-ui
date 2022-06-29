const testPatterns = [
  'src/**/*.test.ts',
  'src/**/*.test.tsx',
  'config/jest/setupTests.ts',
];

module.exports = {
  overrides: [
    {
      files: [
        'public/env.js',
      ],
      rules: {
        'no-underscore-dangle': 0,
      },
      env: {
        browser: true,
      },
    },
    {
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      excludedFiles: testPatterns,
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'no-underscore-dangle': 0,
        'linebreak-style': 0,
        'react/no-array-index-key': 0,
        'react/jsx-props-no-spreading': 0,
        'no-console': 0,
        'import/prefer-default-export': 0,
        'func-names': 0,
      },
    },
    {
      files: testPatterns,
      env: {
        jest: true,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:testing-library/react',
      ],
      rules: {
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': 0,
        'testing-library/no-node-access': 0,
        'func-names': 0,
      },
    },
    {
      files: ['config/webpack/*.ts'],
      env: {
        node: true,
      },
      parserOptions: {
        project: './tsconfig.webpack.json',
      },
      rules: {
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': 0,
      },
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': 0,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
