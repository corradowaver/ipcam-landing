import { ActionButton } from '@/shared/ui/action-button'
import styles from './not-found-page.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <span>404</span>
      <h1>Такой страницы нет.</h1>
      <p>Возможно, ссылка устарела. Вернитесь на главную страницу «Вместе».</p>
      <ActionButton href="/" variant="secondary">
        На главную <span aria-hidden="true">↗</span>
      </ActionButton>
    </section>
  )
}
