import styles from './case-showcase.module.css'

export function CaseNavigation() {
  return (
    <>
      <nav
        className={styles['case-jump-nav']}
        aria-label="Сценарии по площадкам"
      >
        <a href="#case-factory">
          <span>01</span>Производство <span aria-hidden="true">↓</span>
        </a>
        <a href="#case-warehouse">
          <span>02</span>Склад <span aria-hidden="true">↓</span>
        </a>
        <a href="#case-construction">
          <span>03</span>Стройка <span aria-hidden="true">↓</span>
        </a>{' '}
      </nav>{' '}
    </>
  )
}
