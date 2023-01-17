/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "airbnb-base", "plugin:storybook/recommended"],
  plugins: ["@typescript-eslint"],
  overrides: [{
    files: ["*.svelte"],
    parser: "svelte-eslint-parser",
    rules: {
      "import/first": "off",
      "import/no-duplicates": "off",
      "import/no-mutable-exports": "off",
      "import/no-unresolved": "off",
      "no-undef-init": "off",
    },
  }, {
    files: ["*.ts", "*.svelte"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:svelte/recommended"],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
      parser: "@typescript-eslint/parser",
    },
    rules: {
      "comma-dangle": "off",
      "comma-spacing": "off",
      "brace-style": "off",
      "no-extra-semi": "off",
      "no-self-assign": "off",
      "function-paren-newline": "off",
      "svelte/no-at-html-tags": "warn",
      "require-await": "off",
      "object-curly-spacing": "off",
      "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
      "@typescript-eslint/comma-spacing": ["error", {
        before: false,
        after: true,
      }],
      "@typescript-eslint/brace-style": ["error", "1tbs"],
      "@typescript-eslint/no-extra-semi": ["error"],
      "@typescript-eslint/require-await": ["error"],
      "@typescript-eslint/object-curly-spacing": ["error", "always"],
      "@typescript-eslint/type-annotation-spacing": ["error", {
        before: false,
        after: true,
      }],
    },
  }, {
    files: ["*.svelte"],
    rules: {
      "no-multiple-empty-lines": "off",
    },
  }],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
    extraFileExtensions: [".svelte", ".cjs"],
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "no-param-reassign": ["error", {
      props: false,
    }],
    "no-unused-vars": ["error", {
      args: "after-used",
      argsIgnorePattern: "^_",
    }],
    "import/prefer-default-export": ["off"],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", {
      before: false,
      after: true,
    }],
    "brace-style": ["error", "1tbs"],
    "no-extra-semi": ["error"],
    "require-await": ["error"],
    "require-yield": ["error"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "import/extensions": "off",
    "no-plusplus": "off",
    "import/no-extraneous-dependencies": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
};
