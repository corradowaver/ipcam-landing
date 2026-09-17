type ErrorEventCode =
  | 'app.bootstrap-failed'
  | 'theme.storage-unavailable'
  | 'react.caught-error'
  | 'react.uncaught-error'
  | 'react.recoverable-error'
  | 'browser.unhandled-rejection'

export function logError(event: ErrorEventCode, error: unknown): void {
  const details =
    error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { name: 'UnknownError', message: 'A non-Error value was thrown.' }

  console.error(`[${event}]`, details)
}
