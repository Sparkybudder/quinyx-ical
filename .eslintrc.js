module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    // 'airbnb',
    // 'airbnb/hooks',
    // 'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:sonarjs/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // START typescript disable / enable
    // note you must disable the base rules as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // 'comma-dangle': 'off',
    // '@typescript-eslint/comma-dangle': 'error',
    // END typescript disable / enable
    // 'arrow-body-style': 'off',
    // 'import/no-import-module-exports': 'off',
    // 'import/extensions': 'off',
    // 'import/no-cycle': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.spec.tsx'] }],
    // 'no-underscore-dangle': [
    //   'error',
    //   {
    //     allow: [
    //       '__html',
    //       '_score', // field from Elasticsearch
    //       '_source', // field from Elasticsearch
    //       '_hasHydrated', // field from zustand
    //     ],
    //   },
    // ],
    // 'arrow-parens': ['error', 'as-needed'],
    // 'implicit-arrow-linebreak': 'off',
    // 'max-len': ['error', { code: 130 }],
    // complexity: ['error', { max: 10 }],
    // 'sonarjs/cognitive-complexity': ['error', 15],
    // '@typescript-eslint/member-delimiter-style': [
    //   'error',
    //   {
    //     multiline: {
    //       delimiter: 'comma',
    //       requireLast: true,
    //     },
    //     singleline: {
    //       delimiter: 'comma',
    //       requireLast: false,
    //     },
    //   },
    // ],
    // 'react/require-default-props': 'off',
    // 'react/no-array-index-key': 'warn',
    // 'react/function-component-definition': ['error', {
    //   namedComponents: 'arrow-function',
    //   unnamedComponents: 'arrow-function',
    // }],
    // 'react/jsx-no-useless-fragment': 'off',
  },
};
