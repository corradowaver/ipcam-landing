import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

function restrictLayerImports(layer, forbiddenLayers) {
  return {
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: forbiddenLayers.flatMap((name) => [
                `@/${name}`,
                `@/${name}/**`,
              ]),
              message:
                'Keep layer dependencies one-way. Use relative imports inside a module.',
            },
          ],
        },
      ],
    },
  }
}

export default defineConfig([
  globalIgnores([
    'dist/**',
    '.tools/**',
    'playwright-report/**',
    'test-results/**',
  ]),
  {
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'error',
      'max-depth': ['error', 3],
      complexity: ['error', 10],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },
  restrictLayerImports('shared', ['app', 'pages', 'features']),
  restrictLayerImports('features', ['app', 'pages', 'features']),
  restrictLayerImports('pages', ['app', 'pages']),
  {
    files: ['src/shared/lib/logger/logger.ts'],
    rules: { 'no-console': 'off' },
  },
])
