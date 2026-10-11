import { expect, test } from '@playwright/test'

test('all offers remain reachable by keyboard in the horizontal row', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/prices')
  const offers = page.getByRole('region', {
    name: 'Демонстрационные предложения',
  })
  const buttons = offers.getByRole('button', { name: /Запросить демо/ })
  await buttons.first().focus()

  for (let index = 0; index < 3; index++) {
    const button = buttons.nth(index)
    if (index > 0) await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await expect(button).toBeInViewport({ ratio: 1 })
    await page.keyboard.press('Enter')
    await expect(page.getByLabel(/Рабочая почта/)).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(button).toBeFocused()
    await expect(button).toBeInViewport({ ratio: 1 })
  }

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('offer emphasis respects pointer type and reduced motion', async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/prices')
  await page.evaluate(() => document.fonts.ready)
  const card = page.getByRole('article', { name: 'Внедрение', exact: true })
  await card.scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      card.evaluate((element) =>
        element
          .getAnimations()
          .every((animation) => animation.playState === 'finished'),
      ),
    )
    .toBe(true)
  const initial = await card.boundingBox()
  expect(initial).not.toBeNull()

  if (isMobile) {
    await card.getByRole('heading').tap()
    await expect(card).toHaveCSS('scale', '1')
  } else {
    const neighbor = page.getByRole('article', { name: 'Пилот', exact: true })
    const neighborBefore = await neighbor.boundingBox()
    await card.hover()
    await expect(card).toHaveCSS('scale', '1.035')
    const enlarged = await card.boundingBox()
    expect(enlarged?.width).toBeCloseTo((initial?.width ?? 0) * 1.035, 1)
    expect(await neighbor.boundingBox()).toEqual(neighborBefore)
  }

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(card).toHaveCSS('scale', 'none')
  await card.getByRole('button', { name: /Запросить демо/ }).focus()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(card).not.toHaveCSS('box-shadow', 'none')
  await expect(card).toHaveCSS('transition-duration', '0s')
})
