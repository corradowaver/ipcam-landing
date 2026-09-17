import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { format, resolveConfig } from 'prettier'

const mockup = new URL('../mockup-cozy/', import.meta.url)
const read = (path) => readFile(new URL(path, mockup), 'utf8')
const fragmentPath = new URL('vmeste-prototype.fragment.html', mockup)
const indexPath = new URL('index.html', mockup)
const darkIndexPath = new URL('index-dark.html', mockup)
const darkFragmentPath = new URL('vmeste-prototype-dark.fragment.html', mockup)
const options = await resolveConfig(fileURLToPath(indexPath))
const names = [
  'factory-hero',
  'factory-case',
  'warehouse-case',
  'construction-case',
]
const photos = Object.fromEntries(
  await Promise.all(
    names.map(async (name) => [
      name,
      `data:image/webp;base64,${(await readFile(new URL(`assets/${name}-cctv.webp`, mockup))).toString('base64')}`,
    ]),
  ),
)
const stylePaths = [
  'shared/themes.css',
  ...['editorial', 'photography', 'process', 'responsive', 'motion'].map(
    (name) => `home/${name}.css`,
  ),
  ...['base', 'services', 'cases', 'prices', 'about', 'motion'].map(
    (name) => `subpages/${name}.css`,
  ),
]
const styles = await Promise.all(stylePaths.map(read))
const runtimePaths = [
  'shared/photo-scenes.js',
  'shared/view-motion.js',
  'home/home.js',
  'subpages/subpages.js',
]
const runtime = (await Promise.all(runtimePaths.map(read)))
  .join('\n')
  .replaceAll('export function ', 'function ')

function replaceSection(source, start, end, content) {
  const from = source.indexOf(start)
  const to = source.indexOf(end, from)
  if (from < 0 || to < 0) throw new Error(`Missing mockup boundary: ${start}`)
  return `${source.slice(0, from + start.length)}\n${content}\n${source.slice(to)}`
}

let fragment = await read('vmeste-prototype.fragment.html')
fragment = replaceSection(
  fragment,
  '/* home:styles:start */',
  '/* home:styles:end */',
  styles.join('\n'),
)
fragment = replaceSection(
  fragment,
  '<template data-page-template="home">',
  '</template>',
  await read('home/home.html'),
)
for (const page of ['services', 'cases', 'prices', 'about']) {
  fragment = replaceSection(
    fragment,
    `<template data-page-template="${page}">`,
    '</template>',
    await read(`subpages/${page}.html`),
  )
}
fragment = replaceSection(
  fragment,
  '// home:script:start',
  '// home:script:end',
  `${runtime}\nconst prototypePhotos = ${JSON.stringify(photos)}
const photoScenes = createPhotoScenes(root, prototypePhotos)
const homeView = createHomeView(root, photoScenes, cases, capabilities)
const subpagesView = createSubpagesView(root, photoScenes, cases, services, prices)
const viewMotion = createViewMotion(root)`,
)
fragment = await format(fragment, { ...options, parser: 'html' })
const shell = await read('index.html')
const index = await format(
  replaceSection(shell, '<body>', '</body>', fragment),
  { ...options, parser: 'html' },
)
// Both saved themes contain the same pages, runtime, fonts and photographs.
const darkFragment = fragment.replace('data-theme="light"', 'data-theme="dark"')
const darkIndex = index
  .replaceAll('data-theme="light"', 'data-theme="dark"')
  .replace(
    '<title>Вместе — светлая тема</title>',
    '<title>Вместе — тёмная тема</title>',
  )

for (const [path, content] of [
  [fragmentPath, fragment],
  [indexPath, index],
  [darkFragmentPath, darkFragment],
  [darkIndexPath, darkIndex],
]) {
  if (process.argv.includes('--check')) {
    if ((await readFile(path, 'utf8')) !== content)
      throw new Error(`Mockup is out of sync: ${fileURLToPath(path)}`)
  } else {
    await writeFile(path, content)
  }
}
process.stdout.write(
  process.argv.includes('--check')
    ? 'Mockup sources are synchronized.\n'
    : 'Light and dark standalone mockups and fragments rebuilt.\n',
)
