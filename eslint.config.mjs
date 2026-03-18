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
])

export default eslintConfig
