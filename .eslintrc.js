module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  extends: "eslint:recommended",
  env: {
    browser: true
  },
  rules: {
    "no-tabs": [2],
    "no-mixed-spaces-and-tabs": [2],
    /* using two spaces for indentation */
    "indent": ["error", 2]
  }
};
