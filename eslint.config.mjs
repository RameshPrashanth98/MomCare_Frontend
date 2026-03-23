// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import noTailwindArbitrary from './eslint-local-rules/no-tailwind-arbitrary.cjs'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Storybook build output
    'storybook-static/**',
  ]),
  // Local plugin: block arbitrary Tailwind values — enforce design token usage
  {
    plugins: {
      local: {
        rules: {
          'no-tailwind-arbitrary': noTailwindArbitrary,
        },
      },
    },
    rules: {
      'local/no-tailwind-arbitrary': 'error',
    },
  },
  ...storybook.configs["flat/recommended"]
])

export default eslintConfig
