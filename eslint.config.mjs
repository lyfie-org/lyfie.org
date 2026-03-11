import { defineConfig } from "eslint/config";
import nextCoreVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  ...nextCoreVitals,
  ...nextTypescript,
  prettierConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]
  }
]);
