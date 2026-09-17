import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { ActionButton } from '@/shared/ui/action-button'
import styles from './demo-request.module.css'

type DemoRequestProps = {
  onClose: () => void
}

const invalidEmailMessage = 'Проверьте адрес рабочей почты.'

export function DemoRequest({ onClose }: DemoRequestProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    document.getElementById('demo')?.scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'start',
    })
    emailRef.current?.focus({ preventScroll: true })

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault()

    const email = emailRef.current
    if (!email) return

    email.value = email.value.trim()
    if (!email.validity.valid) {
      setError(invalidEmailMessage)
      setIsComplete(false)
      email.focus()
      return
    }

    formRef.current?.reset()
    setError('')
    setIsComplete(true)
  }

  return (
    <section
      aria-labelledby="demo-form-title"
      className={styles.shell}
      id="demo"
    >
      <div className={styles.copy}>
        <h2 id="demo-form-title">Посмотрим на ваших данных.</h2>
        <p>Проведём анализ ваших данных и покажем результат.</p>
      </div>

      <form autoComplete="off" noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label htmlFor="demo-email">
            Рабочая почта <span>· обязательно</span>
            <input
              aria-describedby="demo-form-error demo-form-success"
              aria-invalid={error ? 'true' : undefined}
              id="demo-email"
              name="email"
              placeholder="you@company.ru"
              ref={emailRef}
              required
              type="email"
              onChange={(event) => {
                setIsComplete(false)
                if (event.currentTarget.validity.valid) setError('')
              }}
            />
          </label>
          <label htmlFor="demo-name">
            Имя <span>· необязательно</span>
            <input
              id="demo-name"
              name="name"
              placeholder="Как к вам обращаться"
              onChange={() => {
                setIsComplete(false)
              }}
            />
          </label>
          <label htmlFor="demo-company">
            Компания <span>· необязательно</span>
            <input
              id="demo-company"
              name="company"
              placeholder="Название предприятия"
              onChange={() => {
                setIsComplete(false)
              }}
            />
          </label>
        </div>
        {error ? (
          <p className={styles.error} id="demo-form-error" role="alert">
            {error}
          </p>
        ) : null}
        <p
          className={styles.success}
          hidden={!isComplete}
          id="demo-form-success"
          role="status"
        >
          Демонстрация формы завершена. Данные не отправлены.
        </p>
        <div className={styles.bottom}>
          <ActionButton type="submit">Завершить демонстрацию</ActionButton>
          <ActionButton variant="secondary" onClick={onClose}>
            Закрыть
          </ActionButton>
        </div>
      </form>
    </section>
  )
}
