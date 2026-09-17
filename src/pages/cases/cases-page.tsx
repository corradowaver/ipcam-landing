import { CaseNavigation, CaseShowcase } from '@/features/case-showcase'
import { motionStyles } from '@/shared/lib/reveal'
import styles from './../../shared/ui/editorial/editorial.module.css'

export function CasesPage() {
  return (
    <>
      <section
        className={[
          styles['sub-hero'],
          styles['sub-hero-editorial'],
          motionStyles.reveal,
        ].join(' ')}
        aria-labelledby="cases-title"
        data-reveal=""
      >
        <div>
          <div className={styles['home-kicker']}>
            <span className={styles['home-section-number']}>02</span>Кейсы ·
            примеры применения{' '}
          </div>
          <h1 id="cases-title">
            Место меняется.
            <br />
            Вопросы{' '}
            <span className={styles['ip-highlight']} data-highlight="">
              остаются.
            </span>
          </h1>
        </div>
        <p className={styles['sub-lead']}>
          Сначала контекст.
          <br />
          Потом выводы.
        </p>
      </section>
      <aside
        className={[styles['sub-disclaimer'], motionStyles.reveal].join(' ')}
        data-reveal=""
      >
        <span className={styles['sub-note-mark']} aria-hidden="true">
          i
        </span>
        <p>
          <strong>Демонстрационные примеры.</strong> Сценарии показывают формат
          будущих кейсов. Они не описывают реальные внедрения или измеренные
          результаты.{' '}
        </p>
      </aside>
      <CaseNavigation></CaseNavigation> <CaseShowcase detailed />{' '}
      <section
        className={styles['sub-section']}
        aria-labelledby="case-context-title"
      >
        <div
          className={[styles['sub-section-head'], motionStyles.reveal].join(
            ' ',
          )}
          data-reveal=""
        >
          <div>
            <div className={styles['home-kicker']}>04 / Ваша площадка</div>
            <h2 id="case-context-title">
              Контекст меняет
              <br />
              <span className={styles['home-muted-title']}>картину.</span>
            </h2>
          </div>
          <p>
            Один сценарий проверяется
            <br />в разных условиях.
          </p>
        </div>
        <ol
          className={[styles['sub-sequence'], motionStyles.sequence].join(' ')}
          data-sequence=""
        >
          <li>
            <span>01</span> <h3>Зона обзора</h3>
            <p>Что попадает в кадр камеры.</p>
          </li>
          <li>
            <span>02</span> <h3>Условия</h3>
            <p>Свет, расстояние, перекрытия.</p>
          </li>
          <li>
            <span>03</span> <h3>Наблюдения</h3>
            <p>Что видно на выбранном видео.</p>
          </li>
          <li>
            <span>04</span> <h3>Проверка</h3>
            <p>Где проходят границы подхода.</p>
          </li>
        </ol>
      </section>
    </>
  )
}
