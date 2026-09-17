import { expect, test } from '@playwright/test'

test('published directory routes survive direct entry and reload with their assets', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) {
      errors.push(`${String(response.status())} ${response.url()}`)
    }
  })
  for (const [path, title] of [
    ['', /AI-видеоаналитика/],
    ['services', /От задачи/],
    ['cases', /Место меняется/],
    ['prices', /От первого пилота/],
    ['about', /Технологии работают/],
  ] as const) {
    expect((await page.goto(path || './'))?.status()).toBe(200)
    const heading = page.getByRole('heading', { level: 1, name: title })
    await expect(heading).toBeVisible()
    expect((await page.reload())?.status()).toBe(200)
    await expect(heading).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    const pictures = page.getByRole('img')
    for (const picture of await pictures.all()) {
      await picture.scrollIntoViewIfNeeded()
      await expect(picture).toHaveJSProperty('complete', true)
      expect(
        await picture.evaluate((image: HTMLImageElement) => image.naturalWidth),
      ).toBeGreaterThan(0)
    }
  }
  expect(errors).toEqual([])
})

test('navigation, history, theme and home links stay inside the repository', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('./')
  const toggle = page.getByRole('switch', { name: 'Тёмная тема' })
  await expect(toggle).toBeChecked()
  await toggle.click()
  await page.getByRole('link', { name: /Все возможности/ }).click()
  await expect(page).toHaveURL(/\/ipcam-landing\/services$/)
  await page.reload()
  await expect(
    page.getByRole('heading', { level: 1, name: /От задачи/ }),
  ).toBeVisible()
  await expect(toggle).not.toBeChecked()
  await page.getByRole('link', { name: 'Вместе — главная' }).click()
  await expect(page).toHaveURL(/\/ipcam-landing\/$/)
  await page.goBack()
  await expect(
    page.getByRole('heading', { level: 1, name: /От задачи/ }),
  ).toBeVisible()
  await page.goto('./#home-capabilities')
  await expect(page.locator('#home-capabilities')).toBeInViewport()
})

test('unknown direct routes return a useful 404 and a working home link', async ({
  page,
}) => {
  expect((await page.goto('missing-page'))?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'Такой страницы нет.' }),
  ).toBeVisible()
  await page.getByRole('link', { name: /На главную/ }).click()
  await expect(page).toHaveURL(/\/ipcam-landing\/$/)
  await expect(
    page.getByRole('heading', { level: 1, name: /AI-видеоаналитика/ }),
  ).toBeVisible()
})
