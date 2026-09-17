/* global document, getComputedStyle, window */
import { test, expect } from '@playwright/test'

const widths = [360, 768, 1024, 1440]
for (const width of widths) {
  test(`home composition and photos at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(test.info().project.metadata.entry)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'AI-видеоаналитика',
    )
    const images = page.locator('#ipcam-view img')
    await expect(images).toHaveCount(5)
    // Scroll as a visitor would: decode() alone does not start lazy loading.
    for (const photo of await images.all()) {
      await photo.scrollIntoViewIfNeeded()
      await photo.evaluate((image) => image.decode())
    }
    await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollTo(0, 0))
    expect(
      await images.evaluateAll((elements) =>
        elements.every((image) => image.naturalWidth === 1536),
      ),
    ).toBe(true)
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true)
    const hero = page.locator('.home-hero-figure .home-photo-frame')
    const size = await hero.boundingBox()
    expect(size.width / size.height).toBeCloseTo(1.5, 2)
    const boxes = await hero.locator('.home-detection').all()
    for (const box of boxes) {
      const bounds = await box.boundingBox()
      expect(bounds.x).toBeGreaterThanOrEqual(size.x)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(
        size.x + size.width + 1,
      )
      expect(bounds.y + bounds.height).toBeLessThan(size.y + size.height)
    }
    if (width === 360) {
      const actions = await page.locator('.home-actions').boundingBox()
      expect(size.y).toBeGreaterThan(actions.y + actions.height)
    }
    if (width === 360 || width === 1440) {
      await page.screenshot({
        path: `mockup-cozy/previews/home-${width}${test.info().project.name === 'dark' ? '-dark' : ''}.png`,
        fullPage: true,
      })
      await page.screenshot({
        path: `mockup-cozy/previews/hero-${width}${test.info().project.name === 'dark' ? '-dark' : ''}.png`,
      })
    }
    expect(errors).toEqual([])
  })
}

test('analysis, scenario details and local form work by keyboard', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const outgoing = []
  page.on('request', (request) => {
    if (request.method() !== 'GET') outgoing.push(request.url())
  })
  await page.goto(test.info().project.metadata.entry)
  const toggle = page.getByRole('button', { name: 'Показать анализ' })
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('#home-hero-analysis')).toBeHidden()
  await page.keyboard.press('Enter')
  await expect(page.locator('#home-hero-analysis')).toBeVisible()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  const focus = await toggle.evaluate(
    (button) => getComputedStyle(button).outlineStyle,
  )
  expect(focus).toBe('solid')
  for (const summary of await page.locator('.home-case summary').all()) {
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(summary.locator('..')).toHaveAttribute('open', '')
    await expect(
      summary.locator('..').getByText('Ожидаемый результат'),
    ).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(summary.locator('..')).not.toHaveAttribute('open', '')
  }
  for (const cta of await page
    .getByRole('button', { name: 'Запросить демо' })
    .all()) {
    await cta.click()
    await expect(
      page.getByRole('textbox', { name: 'Рабочая почта' }),
    ).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.locator('#ipcam-demo')).toBeHidden()
    await expect(cta).toBeFocused()
  }
  await page
    .locator('.home-actions')
    .getByRole('button', { name: 'Запросить демо' })
    .click()
  await page.getByRole('button', { name: 'Завершить демонстрацию' }).click()
  await expect(page.getByRole('alert')).toHaveText(
    'Проверьте адрес рабочей почты.',
  )
  await page
    .getByRole('textbox', { name: 'Рабочая почта' })
    .fill('preview@example.com')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText(
    'Демонстрация формы завершена. Данные не отправлены.',
  )
  await expect(
    page.getByRole('textbox', { name: 'Рабочая почта' }),
  ).toHaveValue('')
  await page.getByRole('button', { name: 'Закрыть', exact: true }).click()
  expect(outgoing).toEqual([])
})

test('mobile menu, other four pages and repeated home entry', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto(test.info().project.metadata.entry)
  const menu = page.getByRole('button', { name: 'Меню' })
  const nav = page.getByRole('navigation')
  for (const [label, key] of [
    ['Услуги', 'services'],
    ['Кейсы', 'cases'],
    ['Цены', 'prices'],
    ['О компании', 'about'],
  ]) {
    await menu.click()
    await nav.getByRole('button', { name: label, exact: true }).click()
    await expect(page.locator('#ipcam-view')).toHaveAttribute(
      'data-active-page',
      key,
    )
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.home-hero')).toHaveCount(0)
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true)
    await page
      .getByRole('button', { name: 'Вместе — главная', exact: true })
      .click()
    await expect(
      page.getByRole('button', { name: 'Показать анализ' }),
    ).toHaveAttribute('aria-pressed', 'true')
  }
  await menu.click()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await page.getByRole('link', { name: 'Что умеет Вместе' }).click()
  await expect(page).toHaveURL(/#home-capabilities$/)
  await expect(
    page.getByRole('heading', { name: 'Отдельные наблюдения.' }),
  ).toBeInViewport()
  await page.getByRole('button', { name: 'Все возможности' }).click()
  await expect(page.locator('#ipcam-view')).toHaveAttribute(
    'data-active-page',
    'services',
  )
})

test('motion completes, respects both controls and restarts on reentry', async ({
  page,
}) => {
  await page.goto(test.info().project.metadata.entry)
  const hero = page.locator('.home-hero-figure')
  await expect(hero).toHaveAttribute('data-revealed', 'true')
  await expect
    .poll(() =>
      hero
        .locator('.home-detection')
        .last()
        .evaluate((box) => getComputedStyle(box).opacity),
    )
    .toBe('1')
  await expect(page.locator('[data-home-flow]')).not.toHaveAttribute(
    'data-flow-played',
    'true',
  )
  await page
    .getByRole('list', { name: 'Этапы анализа видео' })
    .scrollIntoViewIfNeeded()
  await expect(page.locator('[data-home-flow]')).toHaveAttribute(
    'data-flow-played',
    'true',
  )
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
  await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
    'data-motion',
    'on',
  )
  const settings = page.getByText('Настройки макета', { exact: true })
  await settings.click()
  await page.getByRole('checkbox', { name: 'Лёгкие анимации' }).uncheck()
  await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
    'data-motion',
    'off',
  )
  expect(
    await page
      .locator('#ipcam-prototype')
      .evaluate((root) => root.getAnimations({ subtree: true }).length),
  ).toBe(0)
  await page
    .getByRole('button', { name: 'Вместе — главная', exact: true })
    .click()
  await expect(page.locator('.home-hero-figure')).toHaveAttribute(
    'data-revealed',
    'true',
  )
  await expect(page.locator('#ipcam-prototype')).toHaveAttribute(
    'data-motion',
    'off',
  )
})
