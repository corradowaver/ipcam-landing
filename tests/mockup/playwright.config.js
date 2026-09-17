import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  retries: 0,
  workers: 2,
  reporter: 'list',
  outputDir: '../../test-results/mockup',
  projects: [
    { name: 'light', metadata: { entry: '/index.html' } },
    { name: 'dark', metadata: { entry: '/index-dark.html' } },
  ],
  use: {
    baseURL: 'http://127.0.0.1:4174',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-mockup.js',
    cwd: '../..',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === '1',
  },
})
