import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/app'
import {
  logError,
  registerUnhandledRejectionLogging,
} from '@/shared/lib/logger'
import '@/shared/styles/global.css'

registerUnhandledRejectionLogging()

const container = document.getElementById('root')

if (!container) {
  const error = new Error('The root element is missing from index.html.')
  logError('app.bootstrap-failed', error)
  throw error
}

createRoot(container, {
  onCaughtError: (error) => {
    logError('react.caught-error', error)
  },
  onUncaughtError: (error) => {
    logError('react.uncaught-error', error)
  },
  onRecoverableError: (error) => {
    logError('react.recoverable-error', error)
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
