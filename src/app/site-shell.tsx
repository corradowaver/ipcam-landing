import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { DemoRequest } from '@/features/demo-request'
import { classNames } from '@/shared/lib/class-names'
import { ActionButton } from '@/shared/ui/action-button'
import { ThemeSwitch } from '@/features/color-theme'
import { useReveal, motionStyles } from '@/shared/lib/reveal'
import { routePaths, routes } from './routes'
import styles from './site-shell.module.css'

type SiteShellProps = {
  children: ReactNode
  currentPath: string
  isDemoOpen: boolean
  onCloseDemo: () => void
  onNavigate: (path: string) => void
  onOpenDemo: () => void
  showCallout: boolean
}

function isModifiedClick(event: MouseEvent<HTMLDivElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function isLocalAnchor(url: URL) {
  return url.pathname === window.location.pathname && Boolean(url.hash)
}

export function SiteShell({
  children,
  currentPath,
  isDemoOpen,
  onCloseDemo,
  onNavigate,
  onOpenDemo,
  showCallout,
}: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const previousPath = useRef(currentPath)
  useReveal(mainRef, currentPath)

  useEffect(() => {
    const isNavigation = previousPath.current !== currentPath
    previousPath.current = currentPath
    if (isNavigation) {
      setIsMenuOpen(false)
      mainRef.current?.focus({ preventScroll: true })
    }
    // React mounts after the browser's initial fragment lookup.
    const target = document.getElementById(window.location.hash.slice(1))
    if (target) {
      const frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
      return () => {
        window.cancelAnimationFrame(frame)
      }
    }
    if (isNavigation) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentPath])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuRef.current?.focus()
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const handleLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      isModifiedClick(event)
    ) {
      return
    }

    if (!(event.target instanceof Element)) return

    const anchor = event.target.closest<HTMLAnchorElement>('a[href]')
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return

    const url = new URL(anchor.href)
    if (url.origin !== window.location.origin) return

    if (isLocalAnchor(url)) return

    event.preventDefault()
    setIsMenuOpen(false)
    onNavigate(url.pathname)
  }

  return (
    <div className={styles.site} onClick={handleLinkClick}>
      <header className={classNames(styles.container, styles.header)}>
        <a
          aria-label="Вместе — главная"
          className={styles.logo}
          href={routePaths.home}
        >
          <span aria-hidden="true" className={styles.logoMark} />
          Вместе
        </a>
        <button
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          className={styles.menu}
          ref={menuRef}
          type="button"
          onClick={() => {
            setIsMenuOpen((isOpen) => !isOpen)
          }}
        >
          Меню <span aria-hidden="true">☰</span>
        </button>
        <nav
          aria-label="Основная навигация"
          className={styles.nav}
          data-open={isMenuOpen}
          id="site-navigation"
        >
          {routes.map((route) => (
            <a
              aria-current={currentPath === route.path ? 'page' : undefined}
              href={route.path}
              key={route.path}
            >
              {route.label}
            </a>
          ))}
        </nav>
        <div className={styles.theme}>
          <ThemeSwitch />
        </div>
        <ActionButton
          className={styles.headerDemo}
          compact
          onClick={onOpenDemo}
        >
          Запросить демо <span aria-hidden="true">↗</span>
        </ActionButton>
      </header>

      {isDemoOpen ? (
        <div className={styles.container}>
          <DemoRequest onClose={onCloseDemo} />
        </div>
      ) : null}

      <main
        className={classNames(styles.container, styles.main)}
        ref={mainRef}
        tabIndex={-1}
      >
        <div key={currentPath}>{children}</div>
        {showCallout ? (
          <section
            aria-label="Демонстрация «Вместе»"
            className={[styles.callout, motionStyles.reveal].join(' ')}
            data-reveal=""
            key={`callout-${currentPath}`}
          >
            <div>
              <h2>
                Давайте посмотрим.
                <br />
                Вместе.
              </h2>
            </div>
            <ActionButton onClick={onOpenDemo}>
              Запросить демо <span aria-hidden="true">↗</span>
            </ActionButton>
          </section>
        ) : null}
      </main>

      <footer className={classNames(styles.container, styles.footer)}>
        <span className={styles.footerBrand}>Вместе</span>
      </footer>
    </div>
  )
}
