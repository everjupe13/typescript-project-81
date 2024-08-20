module.exports = {
  env: {
    node: true
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2021,
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },

  // parserOptions: {
  //   parser: '@typescript-eslint/parser',
  //   project: './tsconfig.json',
  //   tsconfigRootDir: __dirname
  // },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],

  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'prettier'
  ],

  rules: {
    'no-console': 'warn',
    curly: 'error',

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-empty-file': 'off',
    'unicorn/no-array-reduce': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],

    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'import/newline-after-import': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error'
  }
}
