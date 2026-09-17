import { useEffect, useState } from 'react'

export function useBrowserLocation() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = (nextPath: string) => {
    if (nextPath === window.location.pathname) {
      if (window.location.hash) window.history.pushState(null, '', nextPath)
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    window.history.pushState(null, '', nextPath)
    setPathname(nextPath)
  }

  return { navigate, pathname }
}
