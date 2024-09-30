  module.exports = {
    extends: [
        'airbnb-base',
        'plugin:jest/all',
    ],
    languageOptions: {
        globals: {
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
        },
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['jest'],
    rules: {
        'no-console': 'off',
        'no-shadow': 'off',
        'no-restricted-syntax': [
            'error',
            'LabeledStatement',
            'WithStatement',
        ],
    },
    overrides: [
        {
            files: ['*.js'],
            excludedFiles: 'babel.config.js',
        },
    ],
};