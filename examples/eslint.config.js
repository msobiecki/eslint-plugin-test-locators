import { defineConfig } from "eslint/config";

import eslint from "@eslint/js";

import reactBasePlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";

import checkDataTestPlugin from "eslint-plugin-test-locators";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactBasePlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      "check-data-test-attribute": checkDataTestPlugin,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...reactBasePlugin.configs?.flat?.recommended?.rules,
      ...reactBasePlugin.configs?.flat?.["jsx-runtime"]?.rules,
      ...reactHooksPlugin.configs?.flat?.recommended?.rules,
      ...prettierPlugin.configs?.recommended?.rules,
      "check-data-test-attribute/check-data-test-attribute": "error",
    },
  },
]);
