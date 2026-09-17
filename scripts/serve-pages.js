// Test GitHub Pages directory entries without a development server's SPA fallback.
import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'

const root = resolve('dist')
const prefix = '/ipcam-landing/'
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

async function serve(request, response) {
  const url = new URL(request.url, 'http://127.0.0.1:4175')
  if (url.pathname === prefix.slice(0, -1)) {
    response.writeHead(301, { Location: prefix + url.search }).end()
    return
  }
  const path = resolve(
    root,
    decodeURIComponent(url.pathname.slice(prefix.length)),
  )
  if (
    !url.pathname.startsWith(prefix) ||
    (path !== root && !path.startsWith(root + sep))
  ) {
    response.writeHead(404).end()
    return
  }
  try {
    const info = await stat(path)
    if (info.isDirectory() && !url.pathname.endsWith('/')) {
      response
        .writeHead(301, { Location: url.pathname + '/' + url.search })
        .end()
      return
    }
    const file = info.isDirectory() ? resolve(path, 'index.html') : path
    const body = await readFile(file)
    response
      .writeHead(200, {
        'Content-Type':
          contentTypes[extname(file)] ?? 'application/octet-stream',
      })
      .end(body)
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error
    response
      .writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
      .end(await readFile(resolve(root, '404.html')))
  }
}

createServer((request, response) => {
  serve(request, response).catch((error) => {
    console.error('Static Pages test server failed', error)
    response.writeHead(500).end()
  })
}).listen(4175, '127.0.0.1')
