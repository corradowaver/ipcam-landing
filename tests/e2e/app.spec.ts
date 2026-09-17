import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', title: 'AI-видеоаналитика', highlight: 'предприятия.' },
  { path: '/services', title: 'От задачи', highlight: 'проверке.' },
  { path: '/cases', title: 'Место меняется', highlight: 'остаются.' },
  { path: '/prices', title: 'От первого пилота', highlight: 'системе.' },
  { path: '/about', title: 'Технологии работают', highlight: 'людей.' },
]

test('all production routes match the approved headings and load cleanly', async ({
  page,
}) => {
  const runtimeErrors: string[] = []
  const externalRequests: string[] = []

  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text())
  })
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (url.hostname !== '127.0.0.1') externalRequests.push(request.url())
  })

  for (const route of routes) {
    const response = await page.goto(route.path)
    const heading = page.getByRole('heading', {
      level: 1,
      name: new RegExp(route.title),
    })

    expect(response?.ok()).toBe(true)
    await expect(page.getByRole('main')).toBeVisible()
    await expect(heading).toBeVisible()
    await expect(heading.locator('[data-highlight]')).toHaveText(
      route.highlight,
    )
    await expect(heading.locator('[data-highlight]')).toHaveCount(1)
    await expect(page.locator('h2 [data-highlight]')).toHaveCount(0)

    const highlightBackground = await heading
      .locator('[data-highlight]')
      .evaluate((element) => getComputedStyle(element).backgroundImage)
    expect(highlightBackground).toContain('linear-gradient')

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  }

  await expect(page).toHaveTitle('О компании — Вместе')
  await expect(page.getByRole('alert')).toHaveCount(0)
  expect(runtimeErrors).toEqual([])
  expect(externalRequests).toEqual([])
})

test('the local Onest font and CCTV photographs are available', async ({
  page,
}) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)

  const typography = await page
    .getByRole('heading', { level: 1 })
    .evaluate((heading) => ({
      family: getComputedStyle(heading).fontFamily,
      loadedFaces: [...document.fonts].filter(
        (font) =>
          font.family.replace(/["']/g, '') === 'Onest' &&
          font.status === 'loaded',
      ).length,
    }))

  expect(typography.family).toBe('Onest, sans-serif')
  expect(typography.loadedFaces).toBeGreaterThan(0)
  await expect(
    page.getByAltText(/Вид сверху с камеры наблюдения/).first(),
  ).toBeVisible()
  await expect(
    page.getByAltText(/Тот же кадр производственной линии/),
  ).toBeVisible()
})

test('navigation updates the URL, active page and browser history', async ({
  page,
}) => {
  await page.goto('/')

  const menu = page.getByRole('button', { name: /Меню/ })
  if (await menu.isVisible()) await menu.click()

  await page.getByRole('link', { name: 'Услуги' }).click()

  await expect(page).toHaveURL('/services')
  await expect(
    page.getByRole('heading', { level: 1, name: /От задачи/ }),
  ).toBeVisible()

  if (await menu.isVisible()) await menu.click()
  await expect(page.getByRole('link', { name: 'Услуги' })).toHaveAttribute(
    'aria-current',
    'page',
  )

  await page.goBack()
  await expect(page).toHaveURL('/')
  await expect(
    page.getByRole('heading', { level: 1, name: /AI-видеоаналитика/ }),
  ).toBeVisible()
})

test('the form opens below the header, validates locally and restores focus', async ({
  page,
}) => {
  const writeRequests: string[] = []
  page.on('request', (request) => {
    if (request.method() !== 'GET') writeRequests.push(request.url())
  })

  await page.goto('/')
  const trigger = page
    .getByRole('main')
    .getByRole('button', { name: /Запросить демо/ })
    .first()
  await trigger.click()

  const region = page.getByRole('region', {
    name: 'Посмотрим на ваших данных.',
  })
  const email = page.getByLabel(/Рабочая почта/)
  const submit = region.getByRole('button', {
    name: 'Завершить демонстрацию',
  })

  await expect(region).toBeVisible()
  await expect(email).toBeFocused()
  await expect(region.getByText(/Проведём анализ ваших данных/)).toBeVisible()
  await expect(page.getByText('Демонстрационная форма')).toHaveCount(0)

  const verticalOrder = await page.evaluate(() => {
    const header = document.querySelector('header')
    const form = document.querySelector('#demo')
    const main = document.querySelector('main')
    if (!header || !form || !main) return null
    return {
      formAfterHeader:
        form.getBoundingClientRect().top >=
        header.getBoundingClientRect().bottom - 1,
      mainAfterForm:
        main.getBoundingClientRect().top >=
        form.getBoundingClientRect().bottom - 1,
    }
  })
  expect(verticalOrder).toEqual({ formAfterHeader: true, mainAfterForm: true })

  await submit.click()
  await expect(page.getByRole('alert')).toHaveText(
    'Проверьте адрес рабочей почты.',
  )

  await email.fill('wrong-address')
  await submit.click()
  await expect(page.getByRole('alert')).toHaveText(
    'Проверьте адрес рабочей почты.',
  )

  await email.fill('you@company.ru')
  await submit.click()
  await expect(page.getByRole('status')).toHaveText(
    'Демонстрация формы завершена. Данные не отправлены.',
  )
  await expect(email).toHaveValue('')
  expect(writeRequests).toEqual([])
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0)

  await region.getByRole('button', { name: 'Закрыть' }).click()
  await expect(region).toHaveCount(0)
  await expect(trigger).toBeFocused()

  await trigger.click()
  await page.keyboard.press('Escape')
  await expect(region).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('header, price and final call-to-action buttons open the same form', async ({
  page,
}) => {
  await page.goto('/prices')
  const form = page.getByRole('region', { name: 'Посмотрим на ваших данных.' })
  const triggers = [
    page.locator('header').getByRole('button', { name: /Запросить демо/ }),
    page
      .getByRole('region', { name: 'Демонстрационные предложения' })
      .getByRole('button', { name: /Запросить демо/ })
      .first(),
    page
      .getByRole('region', { name: 'Демонстрация «Вместе»' })
      .getByRole('button', { name: /Запросить демо/ }),
  ]

  for (const trigger of triggers) {
    if (!(await trigger.isVisible())) continue
    await trigger.click()
    await expect(form).toBeVisible()
    await form.getByRole('button', { name: 'Закрыть' }).click()
    await expect(trigger).toBeFocused()
  }
})

test('case details disclose the complete demonstration scenario', async ({
  page,
}) => {
  await page.goto('/cases')
  await page.getByText('Разобрать сценарий').first().click()

  await expect(page.getByText('Ожидаемый результат').first()).toBeVisible()
  await expect(page.getByText(/без выводов о производительности/)).toBeVisible()
})

test('layouts remain usable at 360, 736 and 1024 pixels', async ({
  page,
}, testInfo) => {
  for (const width of [360, 736, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(route.path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
    }

    await page.goto('/')

    const menu = page.getByRole('button', { name: /Меню/ })
    if (width === 360) {
      await expect(menu).toBeVisible()
      await menu.click()
      await expect(page.getByRole('navigation')).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(menu).toBeFocused()
    } else {
      await expect(menu).toBeHidden()
    }

    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath(`home-${String(width)}.png`),
    })
  }
})

test('keyboard focus is visible and reduced motion disables animation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')

  const logo = page.getByRole('link', { name: 'Вместе — главная' })
  await expect(logo).toBeFocused()
  expect(
    await logo.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe('none')

  const animatedElements = await page.evaluate(
    () =>
      [...document.querySelectorAll('*')].filter((element) => {
        const style = getComputedStyle(element)
        return (
          style.animationName !== 'none' && style.animationDuration !== '0s'
        )
      }).length,
  )
  expect(animatedElements).toBe(0)
})

test('unknown paths render a useful 404 page', async ({ page }) => {
  const response = await page.goto('/missing-page')

  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle('Страница не найдена — Вместе')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Такой страницы нет.' }),
  ).toBeVisible()
})
