import { useEffect, useState } from 'react'
import { logError } from '@/shared/lib/logger'

type Theme = 'light' | 'dark'
const storageKey = 'vmeste-theme'

function parsePreference(saved: string | null | undefined): Theme | null {
  return saved === 'light' || saved === 'dark' ? saved : null
}

export function useColorTheme() {
  const [preference, setPreference] = useState<Theme | null>(() =>
    parsePreference(document.documentElement.dataset.themePreference),
  )
  const [system, setSystem] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  )
  const theme = preference ?? system

  useEffect(() => {
    if (document.documentElement.dataset.themeStorageError) {
      logError(
        'theme.storage-unavailable',
        new Error('Theme preference cannot be read.'),
      )
      delete document.documentElement.dataset.themeStorageError
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => {
      setSystem(media.matches ? 'dark' : 'light')
    }
    const sync = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null)
        setPreference(parsePreference(event.newValue))
    }
    media.addEventListener('change', update)
    window.addEventListener('storage', sync)
    return () => {
      media.removeEventListener('change', update)
      window.removeEventListener('storage', sync)
    }
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setPreference(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      logError(
        'theme.storage-unavailable',
        new Error('Theme preference cannot be saved.'),
      )
    }
  }

  return { theme, toggle }
}
