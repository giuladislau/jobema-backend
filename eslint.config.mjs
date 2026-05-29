import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      // permitir console no backend
      "no-console": "off",
    },
  },
]);
