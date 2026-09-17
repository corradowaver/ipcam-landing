import { useEffect, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AboutPage } from '@/pages/about'
import { CasesPage } from '@/pages/cases'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { PricesPage } from '@/pages/prices'
import { ServicesPage } from '@/pages/services'
import { AppErrorFallback } from './app-error-fallback'
import { findRoute, routePaths as links } from './routes'
import type { RouteId } from './routes'
import { SiteShell } from './site-shell'
import { useBrowserLocation } from './use-browser-location'

type RouteContentProps = {
  onDemoRequest: () => void
  routeId: RouteId | undefined
}

function RouteContent({ onDemoRequest, routeId }: RouteContentProps) {
  switch (routeId) {
    case 'home':
      return (
        <HomePage
          onDemoRequest={onDemoRequest}
          links={{ services: links.services, cases: links.cases }}
        />
      )
    case 'services':
      return (
        <ServicesPage
          onDemoRequest={onDemoRequest}
          links={{ cases: links.cases }}
        />
      )
    case 'cases':
      return <CasesPage />
    case 'prices':
      return <PricesPage onDemoRequest={onDemoRequest} />
    case 'about':
      return <AboutPage links={{ services: links.services }} />
    default:
      return <NotFoundPage />
  }
}

function SiteApp() {
  const { navigate, pathname } = useBrowserLocation()
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const lastDemoTrigger = useRef<HTMLElement | null>(null)
  const route = findRoute(pathname)

  useEffect(() => {
    document.title = route?.title ?? 'Страница не найдена — Вместе'

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    description?.setAttribute(
      'content',
      route?.description ?? 'Запрошенная страница проекта «Вместе» не найдена.',
    )
  }, [route])

  const openDemo = () => {
    lastDemoTrigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    setIsDemoOpen(true)
  }

  const closeDemo = () => {
    setIsDemoOpen(false)
    window.requestAnimationFrame(() => {
      lastDemoTrigger.current?.focus()
    })
  }

  const navigateTo = (nextPath: string) => {
    setIsDemoOpen(false)
    navigate(nextPath)
  }

  return (
    <SiteShell
      currentPath={route?.path ?? pathname}
      isDemoOpen={isDemoOpen}
      onCloseDemo={closeDemo}
      onNavigate={navigateTo}
      onOpenDemo={openDemo}
      showCallout={Boolean(route)}
    >
      <RouteContent onDemoRequest={openDemo} routeId={route?.id} />
    </SiteShell>
  )
}

export function App() {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <SiteApp />
    </ErrorBoundary>
  )
}
