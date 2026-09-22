import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["tailwind.config.*"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: [
      "admin-portal/**",
      ".next/**",
      ".next/dev/**",
      "out/**",
      "node_modules/**",
      "build/**",
      ".kilo/**",
    ],
  },
]);
