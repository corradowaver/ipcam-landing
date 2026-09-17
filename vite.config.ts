import { fileURLToPath, URL } from 'node:url'
import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { pagePaths } from './src/app/route-paths.ts'

function staticPageEntries(): Plugin {
  let outputDirectory = ''
  return {
    name: 'static-page-entries',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const entry = resolve(outputDirectory, 'index.html')
      for (const path of Object.values(pagePaths)) {
        if (path === '/') continue
        const directory = resolve(outputDirectory, path.slice(1))
        await mkdir(directory, { recursive: true })
        await copyFile(entry, resolve(directory, 'index.html'))
      }
      await copyFile(entry, resolve(outputDirectory, '404.html'))
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/ipcam-landing/' : '/',
  plugins: [react(), mode === 'pages' && staticPageEntries()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}))
