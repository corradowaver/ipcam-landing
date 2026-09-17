import type { ReactNode } from 'react'
import { classNames } from '@/shared/lib/class-names'
import styles from './action-button.module.css'

type ActionButtonProps = {
  children: ReactNode
  className?: string | undefined
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  compact?: boolean
}

export function ActionButton({
  children,
  className,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  compact = false,
}: ActionButtonProps) {
  const classes = classNames(
    styles.button,
    styles[variant],
    compact ? styles.compact : '',
    className,
  )

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
