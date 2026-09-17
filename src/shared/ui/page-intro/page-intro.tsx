import type { ReactNode } from 'react'
import styles from './page-intro.module.css'

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
}

export function PageIntro({ eyebrow, title }: PageIntroProps) {
  return (
    <div className={styles.intro}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1>{title}</h1>
    </div>
  )
}
