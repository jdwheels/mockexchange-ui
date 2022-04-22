module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  extends: ['stylelint-config-standard-scss'],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
};
