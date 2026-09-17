import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const pages = new Map([
  ['/', 'index.html'],
  ['/index.html', 'index.html'],
  ['/index-dark.html', 'index-dark.html'],
])
const server = createServer(async (request, response) => {
  const filename = pages.get(request.url)
  if (request.method !== 'GET' || !filename) {
    response.writeHead(404).end()
    return
  }
  try {
    const html = await readFile(
      new URL(`../mockup-cozy/${filename}`, import.meta.url),
    )
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    response.end(html)
  } catch (error) {
    console.error('MOCKUP_READ_FAILED', error)
    response.writeHead(500).end('Unable to load the mockup.')
  }
})
server.listen(4174, '127.0.0.1', () =>
  process.stdout.write('Mockup: http://127.0.0.1:4174\n'),
)
