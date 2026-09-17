import { defineConfig } from '@playwright/test'
import config from './playwright.config'

export default defineConfig({
  ...config,
  testDir: './tests/pages',
  use: {
    ...config.use,
    baseURL: 'http://127.0.0.1:4175/ipcam-landing/',
  },
  webServer: {
    command: 'node scripts/serve-pages.js',
    url: 'http://127.0.0.1:4175/ipcam-landing/',
    reuseExistingServer: false,
  },
})
