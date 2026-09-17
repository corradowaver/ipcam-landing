import { pagePaths } from './route-paths'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export const routePaths = Object.fromEntries(
  Object.entries(pagePaths).map(([id, path]) => [id, `${basePath}${path}`]),
) as Record<keyof typeof pagePaths, string>

export type RouteId = 'about' | 'cases' | 'home' | 'prices' | 'services'

export type SiteRoute = {
  description: string
  id: RouteId
  label: string
  path: string
  title: string
}

export const routes: SiteRoute[] = [
  {
    id: 'home',
    path: routePaths.home,
    label: 'Главная',
    title: 'Вместе — AI-видеоаналитика для предприятий',
    description:
      'AI-видеоаналитика для наблюдения за людьми, движением и видеопотоком на предприятии.',
  },
  {
    id: 'services',
    path: routePaths.services,
    label: 'Услуги',
    title: 'Услуги — Вместе',
    description:
      'Обследование задачи, пилот видеоаналитики и план развития решения для предприятия.',
  },
  {
    id: 'cases',
    path: routePaths.cases,
    label: 'Кейсы',
    title: 'Кейсы — Вместе',
    description:
      'Демонстрационные сценарии применения видеоаналитики на разных площадках.',
  },
  {
    id: 'prices',
    path: routePaths.prices,
    label: 'Цены',
    title: 'Цены — Вместе',
    description:
      'Демонстрационные форматы сотрудничества для пилота и развития видеоаналитики.',
  },
  {
    id: 'about',
    path: routePaths.about,
    label: 'О компании',
    title: 'О компании — Вместе',
    description:
      'Подход проекта «Вместе» к проверке сценариев AI-видеоаналитики на реальных видеоданных.',
  },
]

export function findRoute(pathname: string) {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  return routes.find(
    (route) => (route.path.replace(/\/+$/, '') || '/') === normalizedPath,
  )
}
