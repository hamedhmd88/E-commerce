import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**",
      ".next-build/**",
      ".next-visual-preview/**",
      "out/**",
      "build/**",
      "output/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    ...nextPlugin.flatConfig.recommended,
    rules: {
      ...nextPlugin.flatConfig.recommended.rules,
      ...nextPlugin.flatConfig.coreWebVitals.rules,
      ...reactHooks.configs.recommended.rules,
    },
    plugins: {
      ...nextPlugin.flatConfig.recommended.plugins,
      "react-hooks": reactHooks,
    },
    settings: { next: { rootDir: "." } },
  },
];
