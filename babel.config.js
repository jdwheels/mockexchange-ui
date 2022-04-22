const presets = [
  '@babel/preset-react',
  '@babel/preset-typescript',
];

const plugins = [];

switch (process.env.NODE_ENV) {
  case 'production': {
    presets.push([
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
      },
    ]);
    break;
  }
  case 'test': {
    presets.push([
      '@babel/preset-env',
      { targets: { node: 'current' } },
    ]);
    break;
  }
  default: {
    plugins.push('react-refresh/babel');
  }
}

module.exports = {
  presets,
  plugins,
};
