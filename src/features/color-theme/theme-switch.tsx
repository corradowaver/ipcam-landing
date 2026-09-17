import { useColorTheme } from './use-color-theme'
import styles from './theme-switch.module.css'

export function ThemeSwitch() {
  const { theme, toggle } = useColorTheme()
  return (
    <button
      type="button"
      role="switch"
      aria-label="Тёмная тема"
      aria-checked={theme === 'dark'}
      title={
        theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
      }
      className={styles.switch}
      onClick={toggle}
    >
      <span className={styles.thumb} aria-hidden="true" />
      <svg
        className={styles.sun}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
      </svg>
      <svg
        className={styles.moon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5 8.8 8.8 0 1 0 20.5 14.2Z" />
        <path d="M18 3v4m-2-2h4" />
      </svg>
    </button>
  )
}
