// eslint.config.js

import globals from "globals";
import js from "@eslint/js";

export default [
  { 
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: "readonly",
      },
    },
  //   plugins: {
  //     jest: pluginObject
  // },
    // ...other config
    rules: {
      "no-console": "off",
      "no-shadow": "off",
      'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    },

  
    
  },
];
