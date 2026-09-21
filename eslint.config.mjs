import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**", ".next-*/**", "out/**", "next-env.d.ts",
    ".agents/**", ".claude/**", ".codex/**",
    ".playwright-cli/**", ".playwright-mcp/**", ".playwright-*.js", "output/**",
  ]),
]);
