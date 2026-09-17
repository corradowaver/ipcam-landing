import { AnalysisPhoto, AnalysisFlow } from '@/features/video-analysis-art'
import { ActionButton } from '@/shared/ui/action-button'
import { HomeCapabilities } from './home-capabilities'
import { CaseShowcase } from '@/features/case-showcase'
import { editorialStyles } from '@/shared/ui/editorial'
import { motionStyles } from '@/shared/lib/reveal'
import styles from './home-page.module.css'

export function HomePage({
  onDemoRequest,
  links,
}: {
  onDemoRequest: () => void
  links: { services: string; cases: string }
}) {
  return (
    <>
      <section className={styles['home-hero']} aria-labelledby="home-title">
        <div className={motionStyles.reveal} data-reveal="">
          <div className={editorialStyles['home-kicker']}>
            <span
              className={editorialStyles['home-signal']}
              aria-hidden="true"
            ></span>
            Вместе · AI для предприятий{' '}
          </div>
          <h1 id="home-title">
            AI-видеоаналитика
            <br />
            для вашего
            <br />
            <span
              className={[
                editorialStyles['ip-highlight'],
                styles['ip-highlight'],
              ].join(' ')}
              data-highlight=""
            >
              предприятия.
            </span>
          </h1>
          <p className={styles['home-intro']}>
            Помогаем видеть людей и их движение в видеопотоке ваших камер.{' '}
          </p>
          <div className={editorialStyles['home-actions']}>
            <ActionButton onClick={onDemoRequest}>
              Запросить демо <span aria-hidden="true">↗</span>
            </ActionButton>{' '}
            <a
              className={[
                editorialStyles['home-text-link'],
                styles['home-text-link'],
              ].join(' ')}
              href="#home-capabilities"
            >
              Что умеет Вместе <span aria-hidden="true">↓</span>
            </a>{' '}
          </div>
          <div className={styles['home-hero-note']}>
            <span aria-hidden="true">⌜</span> Внимание к деталям.
            <br />
            Понимание целой картины.{' '}
          </div>
        </div>
        <AnalysisPhoto metadata />{' '}
      </section>
      <section
        className={[
          styles['home-section'],
          styles['home-capabilities'],
          motionStyles.reveal,
        ].join(' ')}
        id="home-capabilities"
        aria-labelledby="home-capabilities-title"
        data-reveal=""
      >
        <div className={styles['home-section-heading']}>
          <div className={editorialStyles['home-kicker']}>
            <span className={editorialStyles['home-section-number']}>01</span>
            Возможности{' '}
          </div>
          <h2 id="home-capabilities-title">
            Отдельные наблюдения.
            <br />
            <span className={editorialStyles['home-muted-title']}>
              Цельная картина.
            </span>
          </h2>
          <p>От присутствия человека в кадре — к пониманию его движения.</p>
          <a
            href={links.services}
            className={[
              editorialStyles['home-text-link'],
              styles['home-text-link'],
            ].join(' ')}
          >
            Все возможности <span aria-hidden="true">↗</span>
          </a>{' '}
        </div>
        <HomeCapabilities />{' '}
      </section>
      <section
        className={[styles['home-section'], motionStyles.reveal].join(' ')}
        aria-labelledby="home-process-title"
        data-reveal=""
      >
        <div className={styles['home-section-head']}>
          <div>
            <div className={editorialStyles['home-kicker']}>
              <span className={editorialStyles['home-section-number']}>02</span>
              Как это работает{' '}
            </div>
            <h2 id="home-process-title">
              От камеры —<br />к пониманию.
            </h2>
          </div>
          <p>
            Видео становится нагляднее.
            <br />
            Результат остаётся в контексте кадра.{' '}
          </p>
        </div>
        <AnalysisFlow />{' '}
        <div className={styles['home-flow-footnote']}>
          <span className={editorialStyles['home-kicker']}>
            Один кадр. Три этапа.
          </span>
          <span className={editorialStyles['home-disclosure']}>
            Демонстрационный сценарий · изображение создано ИИ
          </span>
        </div>
      </section>
      <section
        className={styles['home-section']}
        aria-labelledby="home-scenarios-title"
      >
        <div
          className={[styles['home-section-head'], motionStyles.reveal].join(
            ' ',
          )}
          data-reveal=""
        >
          <div>
            <div className={editorialStyles['home-kicker']}>
              <span className={editorialStyles['home-section-number']}>03</span>
              Сценарии{' '}
            </div>
            <h2 id="home-scenarios-title">
              Разные площадки.
              <br />
              <span className={editorialStyles['home-muted-title']}>
                Ваш контекст.
              </span>
            </h2>
          </div>
          <a
            href={links.cases}
            className={[
              editorialStyles['home-text-link'],
              styles['home-text-link'],
            ].join(' ')}
          >
            Примеры применения <span aria-hidden="true">↗</span>
          </a>{' '}
        </div>
        <CaseShowcase />{' '}
      </section>
    </>
  )
}
