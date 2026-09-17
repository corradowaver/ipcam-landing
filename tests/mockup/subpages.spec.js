/* global document, window */
import { test, expect } from '@playwright/test'

const pages = [
  { key: 'services', label: 'Услуги', heading: 'От задачи', photos: 2 },
  { key: 'cases', label: 'Кейсы', heading: 'Место меняется', photos: 3 },
  { key: 'prices', label: 'Цены', heading: 'От первого пилота', photos: 0 },
  {
    key: 'about',
    label: 'О компании',
    heading: 'Технологии работают',
    photos: 1,
  },
]

async function navigate(page, label) {
  const menu = page.getByRole('button', { name: 'Меню' })
  if (await menu.isVisible()) await menu.click()
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('button', { name: label, exact: true })
    .click()
}

for (const width of [360, 768, 1024, 1440]) {
  test(`editorial subpages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(test.info().project.metadata.entry)
    for (const item of pages) {
      await navigate(page, item.label)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(
        item.heading,
      )
      await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
        'data-active-page',
        item.key,
      )
      const photos = page.locator('#ipcam-view img')
      await expect(photos).toHaveCount(item.photos)
      for (const photo of await photos.all()) {
        await photo.scrollIntoViewIfNeeded()
        await photo.evaluate((image) => image.decode())
        expect(await photo.evaluate((image) => image.naturalWidth)).toBe(1536)
      }
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true)
      await page.evaluate(() => window.scrollTo(0, 0))
      const prefix =
        width === 360 || width === 1440
          ? 'mockup-cozy/previews'
          : '.tools/subpage-previews'
      await page.screenshot({
        path: `${prefix}/${item.key}-${width}${test.info().project.name === 'dark' ? '-dark' : ''}.png`,
        fullPage: true,
      })
    }
    expect(errors).toEqual([])
  })
}

test('service steps, shared analysis and case anchors work by keyboard', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(test.info().project.metadata.entry)
  await navigate(page, 'Услуги')
  const stages = page.locator('.service-stage')
  await expect(stages).toHaveCount(4)
  for (const stage of await stages.all()) {
    const summary = stage.locator('summary')
    if ((await stage.getAttribute('open')) !== null) await summary.click()
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(stage).toHaveAttribute('open', '')
    await expect(stage.locator('.service-stage-result')).toBeVisible()
  }
  const analysis = page.getByRole('button', { name: 'Показать анализ' })
  await analysis.click()
  await expect(page.locator('#services-analysis')).toBeHidden()
  await analysis.press('Space')
  await expect(page.locator('#services-analysis')).toBeVisible()
  await page.getByRole('button', { name: 'Другие сценарии' }).click()
  const anchors = page.getByRole('navigation', {
    name: 'Сценарии по площадкам',
  })
  for (const [label, name] of [
    ['Производство', 'Производственный цех'],
    ['Склад', 'Склад'],
    ['Стройка', 'Строительная площадка'],
  ]) {
    await anchors.getByRole('link', { name: new RegExp(label) }).click()
    const article = page.getByRole('article', { name, exact: true })
    await expect(article).toBeInViewport()
    const summary = article.locator('summary')
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(article.getByText('Ожидаемый результат')).toBeVisible()
  }
})

test('all price CTAs keep the local form and cost factors disclose', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const writes = []
  page.on('request', (request) => {
    if (request.method() !== 'GET') writes.push(request.url())
  })
  await page.goto(test.info().project.metadata.entry)
  await navigate(page, 'Цены')
  await expect(page.getByText('49 000 ₽', { exact: true })).toBeVisible()
  await expect(page.getByText('149 000 ₽', { exact: true })).toBeVisible()
  for (const cta of await page
    .getByRole('button', { name: 'Запросить демо' })
    .all()) {
    if (!(await cta.isVisible())) continue
    await cta.click()
    await expect(
      page.getByRole('textbox', { name: 'Рабочая почта' }),
    ).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(cta).toBeFocused()
  }
  for (const summary of await page
    .locator('.price-factor-list summary')
    .all()) {
    await summary.click()
    await expect(summary.locator('..').locator('p')).toBeVisible()
  }
  expect(writes).toEqual([])
})

test('new sequences respect reduced motion and repeated page transitions', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(test.info().project.metadata.entry)
  for (const label of ['Кейсы', 'О компании']) {
    await navigate(page, label)
    const sequence = page.locator('[data-sequence]').last()
    await expect(sequence).not.toHaveAttribute('data-revealed', 'true')
    await sequence.scrollIntoViewIfNeeded()
    await expect(sequence).toHaveAttribute('data-revealed', 'true')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
      'data-motion',
      'off',
    )
    expect(
      await page
        .locator('#ipcam-prototype')
        .evaluate((root) => root.getAnimations({ subtree: true }).length),
    ).toBe(0)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
  }
  await page.getByText('Настройки макета', { exact: true }).click()
  await page.getByRole('checkbox', { name: 'Лёгкие анимации' }).uncheck()
  for (const { label } of pages) {
    await navigate(page, label)
    await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
      'data-motion',
      'off',
    )
    expect(
      await page
        .locator('#ipcam-prototype')
        .evaluate((root) => root.getAnimations({ subtree: true }).length),
    ).toBe(0)
  }
  await navigate(page, 'Главная')
  await expect(
    page.getByRole('button', { name: 'Показать анализ' }),
  ).toHaveAttribute('aria-pressed', 'true')
  expect(errors).toEqual([])
})
