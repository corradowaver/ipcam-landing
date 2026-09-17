import { logError } from './logger'

function handleUnhandledRejection(event: PromiseRejectionEvent): void {
  logError('browser.unhandled-rejection', event.reason)
}

export function registerUnhandledRejectionLogging(): void {
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  })
}
