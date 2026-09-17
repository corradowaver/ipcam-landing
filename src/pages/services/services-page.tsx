import { AnalysisPhoto } from '@/features/video-analysis-art'
import { ActionButton } from '@/shared/ui/action-button'
import { editorialStyles } from '@/shared/ui/editorial'
import { motionStyles } from '@/shared/lib/reveal'
import { scenePhotos } from '@/shared/assets/scenes'
import { ServiceStages } from './service-stages'
import styles from './services-page.module.css'

export function ServicesPage({
  onDemoRequest,
  links,
}: {
  onDemoRequest: () => void
  links: { cases: string }
}) {
  return (
    <>
      <section
        className={[
          editorialStyles['sub-hero'],
          editorialStyles['sub-hero-split'],
        ].join(' ')}
        aria-labelledby="services-title"
      >
        <div data-reveal="" className={motionStyles.reveal}>
          <div className={editorialStyles['home-kicker']}>
            <span className={editorialStyles['home-section-number']}>01</span>
            Услуги · от задачи к решению{' '}
          </div>
          <h1 id="services-title">
            От задачи —<br />к{' '}
            <span className={editorialStyles['ip-highlight']} data-highlight="">
              проверке.
            </span>
          </h1>
          <p className={editorialStyles['sub-lead']}>
            Начинаем с вашего вопроса. Проверяем, что можно увидеть на
            видео.{' '}
          </p>
          <div className={editorialStyles['home-actions']}>
            <ActionButton onClick={onDemoRequest}>
              Запросить демо <span aria-hidden="true">↗</span>
            </ActionButton>
            <a
              className={editorialStyles['home-text-link']}
              href="#service-stages"
            >
              Этапы работы <span aria-hidden="true">↓</span>
            </a>{' '}
          </div>
        </div>
        <figure
          className={[
            editorialStyles['sub-hero-photo'],
            motionStyles.reveal,
          ].join(' ')}
          data-reveal=""
        >
          <div className={editorialStyles['home-frame-meta']}>
            <span>Исходная точка / Ваша площадка</span>
            <span aria-hidden="true">ВМ / 01</span>
          </div>
          <div
            className={[
              editorialStyles['home-photo-frame'],
              editorialStyles['home-corners'],
            ].join(' ')}
          >
            <img
              src={scenePhotos['factory-case']}
              width="1536"
              height="1024"
              alt="Производственная линия с работающими сотрудниками, снятая сверху стационарной камерой."
            />
            <span
              className={editorialStyles['sub-frame-guide']}
              aria-hidden="true"
            ></span>
          </div>
          <figcaption className={editorialStyles['home-disclosure']}>
            Демонстрационный сценарий · изображение создано ИИ{' '}
          </figcaption>
        </figure>
      </section>
      <section
        className={[
          editorialStyles['sub-section'],
          styles['service-method'],
        ].join(' ')}
        id="service-stages"
        aria-labelledby="service-method-title"
      >
        <div
          className={[
            editorialStyles['sub-section-heading'],
            motionStyles.reveal,
          ].join(' ')}
          data-reveal=""
        >
          <div className={editorialStyles['home-kicker']}>
            01 / Последовательность
          </div>
          <h2 id="service-method-title">
            Четыре шага.
            <br />
            <span className={editorialStyles['home-muted-title']}>
              Одна задача.
            </span>
          </h2>
          <p>У каждого этапа — свой проверяемый результат.</p>
          <div className={styles['service-index-mark']} aria-hidden="true">
            04
            <span>
              от вопроса
              <br />к решению
            </span>
          </div>
        </div>
        <ServiceStages />{' '}
      </section>
      <section
        className={[
          editorialStyles['sub-section'],
          styles['service-demonstration'],
          motionStyles.reveal,
        ].join(' ')}
        aria-labelledby="helmet-demo-title"
        data-reveal=""
      >
        <AnalysisPhoto />{' '}
        <div>
          <div className={editorialStyles['home-kicker']}>
            02 / Проверяем на примере
          </div>
          <h2 id="helmet-demo-title">
            Контроль касок.
            <br />
            <span className={editorialStyles['home-muted-title']}>
              Сначала — проверка.
            </span>
          </h2>
          <p>
            Статус каски имитируется для демонстрации интерфейса. Это не готовое
            распознавание нарушений.{' '}
          </p>
          <div className={styles['service-legend']}>
            <span>
              <i aria-hidden="true"></i>Каска
            </span>
            <span>
              <i aria-hidden="true"></i>Без каски
            </span>
          </div>
          <a href={links.cases} className={editorialStyles['home-text-link']}>
            Другие сценарии <span aria-hidden="true">↗</span>
          </a>{' '}
        </div>
      </section>
    </>
  )
}
