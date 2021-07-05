module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'consistent-return': [0, false],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/prefer-default-export': [0, false],
    'no-shadow': [0, false],
    'no-underscore-dangle': [0, false],
    'no-unused-expressions': [0, false],
    'no-use-before-define': [0, false],
    'prettier/prettier': 'error',
    radix: [0, false],
    'react/jsx-filename-extension': [0, false],
    'react/jsx-one-expression-per-line': [0, false],
    'react/jsx-props-no-spreading': [0, false],
    'react/prop-types': [0, false],
    'react/require-default-props': [0, false],
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
