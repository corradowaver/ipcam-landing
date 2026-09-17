import { editorialStyles } from '@/shared/ui/editorial'
import { DetectionOverlay } from './detection-overlay'
import { scenePhotos } from '@/shared/assets/scenes'
import styles from './video-analysis-art.module.css'

export function AnalysisFlow() {
  return (
    <>
      <ol
        className={styles['home-flow']}
        aria-label="Этапы анализа видео"
        data-sequence=""
      >
        <li
          className={[
            styles['home-flow-step'],
            styles['home-flow-camera'],
          ].join(' ')}
        >
          <div
            className={[
              styles['home-flow-visual'],
              editorialStyles['home-corners'],
            ].join(' ')}
          >
            <svg viewBox="0 0 240 170" fill="none" aria-hidden="true">
              <path
                d="M59 134h116M104 134V96m0 19 36 19"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              ></path>{' '}
              <path
                d="m43 43 137 15-9 43L37 76z"
                fill="var(--color-surface)"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              ></path>{' '}
              <path
                d="m181 61 18 3-7 36-18-3z"
                fill="#55d6c2"
                stroke="currentColor"
                strokeWidth="2"
              ></path>{' '}
              <path
                d="m47 43 13-10 130 15-10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              ></path>{' '}
              <path
                d="m209 72 13-3m-15 14 14 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>{' '}
              <circle cx="66" cy="66" r="4" fill="#55d6c2"></circle>{' '}
            </svg>
          </div>
          <div className={styles['home-flow-label']}>
            <span>01</span> <h3>Камера</h3>
          </div>
          <p>Передаёт исходный видеопоток.</p>
          <span className={styles['home-flow-connector']} aria-hidden="true">
            <span></span>→
          </span>
        </li>
        <li
          className={[styles['home-flow-step'], styles['home-flow-ai']].join(
            ' ',
          )}
        >
          <div className={styles['home-flow-visual']}>
            <div className={styles['home-ai-chip']}>
              <span
                className={styles['home-ai-grid']}
                aria-hidden="true"
              ></span>
              <strong>AI</strong>
              <span
                className={styles['home-ai-point']}
                aria-hidden="true"
              ></span>
            </div>
          </div>
          <div className={styles['home-flow-label']}>
            <span>02</span> <h3>AI-анализ</h3>
          </div>
          <p>Обнаруживает людей в кадре.</p>
          <span className={styles['home-flow-connector']} aria-hidden="true">
            <span></span>→
          </span>
        </li>
        <li
          className={[
            styles['home-flow-step'],
            styles['home-flow-result'],
          ].join(' ')}
        >
          <div className={styles['home-flow-visual']}>
            <div className={styles['home-result-window']}>
              <div className={styles['home-result-toolbar']}>
                <span
                  className={editorialStyles['home-signal']}
                  aria-hidden="true"
                ></span>
                Результат анализа<span aria-hidden="true">⌗</span>
              </div>
              <div
                className={[
                  editorialStyles['home-photo-frame'],
                  styles['home-photo-frame'],
                ].join(' ')}
              >
                <img
                  src={scenePhotos['factory-hero']}
                  width="1536"
                  height="1024"
                  loading="lazy"
                  alt="Тот же кадр производственной линии с отдельным слоем рамок обнаружения."
                />{' '}
                <DetectionOverlay small />{' '}
              </div>
            </div>
          </div>
          <div className={styles['home-flow-label']}>
            <span>03</span> <h3>Интерфейс наблюдения</h3>
          </div>
          <p>Показывает обнаружения поверх видео.</p>
        </li>
      </ol>
    </>
  )
}
