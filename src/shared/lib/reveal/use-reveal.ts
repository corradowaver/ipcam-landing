import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useReveal(root: RefObject<HTMLElement | null>, view: string) {
  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>(
      '[data-reveal], [data-sequence]',
    )
    if (!elements) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.target instanceof HTMLElement)
            entry.target.dataset.revealed = 'true'
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    const reveal = () => {
      if (!preference.matches) return
      observer.disconnect()
      elements.forEach((element) => {
        element.dataset.revealed = 'true'
      })
    }
    if (preference.matches) reveal()
    else
      elements.forEach((element) => {
        observer.observe(element)
      })
    preference.addEventListener('change', reveal)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', reveal)
    }
  }, [root, view])
}
