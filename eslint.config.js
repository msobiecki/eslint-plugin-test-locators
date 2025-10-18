import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
]);
