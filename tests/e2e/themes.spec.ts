import { expect, test } from '@playwright/test'

test('system theme follows device changes until a manual choice is saved', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  const toggle = page.getByRole('switch', { name: 'Тёмная тема' })
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(toggle).not.toBeChecked()
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(toggle).toBeChecked()
  await expect(toggle).toBeFocused()
  expect(
    await toggle.evaluate((el) => getComputedStyle(el).outlineStyle),
  ).not.toBe('none')
  await page.reload()
  await expect(toggle).toBeChecked()
  await page.getByRole('link', { name: /Все возможности/ }).click()
  await expect(page).toHaveURL('/services')
  await expect(toggle).toBeChecked()
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(toggle).toBeChecked()
  await toggle.click()
  await page.reload()
  await expect(toggle).not.toBeChecked()
})

test('invalid preferences fall back to the device and theme renders before React loads', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('vmeste-theme', 'invalid')
  })
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.route('**/assets/*.js', (route) => route.abort())
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.unroute('**/assets/*.js')
  await page.reload()
  await expect(page.getByRole('switch', { name: 'Тёмная тема' })).toBeChecked()
})

test('blocked storage still allows theme changes without crashing', async ({
  page,
}) => {
  const errors: string[] = []
  const logs: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') logs.push(message.text())
  })
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked')
      },
    })
  })
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const toggle = page.getByRole('switch', { name: 'Тёмная тема' })
  await toggle.click()
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(errors).toEqual([])
  expect(logs).toHaveLength(2)
  expect(
    logs.every((message) => message.includes('[theme.storage-unavailable]')),
  ).toBe(true)
})

test('analysis controls, anchors, disclosures and page re-entry work in dark mode', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Показать анализ' })
  const overlay = page.getByTestId('analysis-overlay').first()
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await toggle.click()
  await expect(overlay).toBeHidden()
  await toggle.click()
  await expect(overlay).toBeVisible()
  await page.getByRole('link', { name: /Что умеет Вместе/ }).click()
  await expect(page).toHaveURL('/#home-capabilities')
  await expect(
    page.getByRole('heading', { name: /Отдельные наблюдения/ }),
  ).toBeInViewport()
  await page.reload()
  await expect
    .poll(() =>
      page
        .locator('#home-capabilities')
        .evaluate((element) => Math.round(element.getBoundingClientRect().top)),
    )
    .toBe(24)
  await page.getByRole('link', { name: 'Вместе — главная' }).click()
  await expect(page).toHaveURL('/')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.getByRole('link', { name: /Примеры применения/ }).click()
  await expect(page).toHaveURL('/cases')
  await page.getByRole('link', { name: /Стройка/ }).click()
  await expect(page).toHaveURL('/cases#case-construction')
  const scenario = page.getByRole('article', { name: 'Строительная площадка' })
  await scenario.getByText('Разобрать сценарий').click()
  await expect(scenario.getByText('Ожидаемый результат')).toBeVisible()
  await page.getByRole('link', { name: 'Вместе — главная' }).click()
  await expect(page).toHaveURL('/')
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(overlay).toBeVisible()
  await page
    .getByRole('main')
    .getByRole('button', { name: /Запросить демо/ })
    .first()
    .click()
  await expect(page.getByLabel(/Рабочая почта/)).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(
    page
      .getByRole('main')
      .getByRole('button', { name: /Запросить демо/ })
      .first(),
  ).toBeFocused()
})

for (const theme of ['light', 'dark'] as const) {
  test(`all five pages render the ${theme} mockup at responsive widths`, async ({
    page,
  }, testInfo) => {
    const widths =
      testInfo.project.name === 'chromium-mobile' ? [360, 768] : [1024, 1440]
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 })
      for (const route of ['/', '/services', '/cases', '/prices', '/about']) {
        await page.goto(route)
        await page.evaluate(() => document.fonts.ready)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        for (const photo of await page.getByRole('img').all()) {
          await photo.scrollIntoViewIfNeeded()
          await expect(photo).toBeVisible()
          await expect
            .poll(() =>
              photo.evaluate(
                (img) =>
                  img instanceof HTMLImageElement &&
                  img.complete &&
                  img.naturalWidth === 1536,
              ),
            )
            .toBe(true)
        }
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true)
        const background = await page
          .locator('body')
          .evaluate((el) => getComputedStyle(el).backgroundColor)
        expect(background).toBe(
          theme === 'dark' ? 'rgb(23, 26, 34)' : 'rgb(246, 247, 251)',
        )
        await page.evaluate(() => {
          window.scrollTo(0, 0)
        })
        const name = route === '/' ? 'home' : route.slice(1)
        await page.screenshot({
          fullPage: true,
          animations: 'disabled',
          path: testInfo.outputPath(`${name}-${String(width)}-${theme}.png`),
        })
      }
    }
    expect(errors).toEqual([])
  })
}
