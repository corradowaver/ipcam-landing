import { useId, useState } from 'react'
import { scenePhotos } from '@/shared/assets/scenes'
import { editorialStyles as common } from '@/shared/ui/editorial'
import { motionStyles } from '@/shared/lib/reveal'
import { DetectionOverlay } from './detection-overlay'
import styles from './video-analysis-art.module.css'

export function AnalysisPhoto({ metadata = false }: { metadata?: boolean }) {
  const [visible, setVisible] = useState(true)
  const id = useId()
  return (
    <figure
      className={[styles['home-hero-figure'], motionStyles.reveal].join(' ')}
      data-reveal=""
    >
      {metadata && (
        <div className={common['home-frame-meta']}>
          <span>В фокусе / Производственная линия</span>
          <span aria-hidden="true">01 — 03</span>
        </div>
      )}
      <div
        className={[common['home-photo-frame'], common['home-corners']].join(
          ' ',
        )}
      >
        <img
          src={scenePhotos['factory-hero']}
          width="1536"
          height="1024"
          fetchPriority={metadata ? 'high' : 'auto'}
          loading={metadata ? 'eager' : 'lazy'}
          alt="Вид сверху с камеры наблюдения на производственную линию с коробками и тремя сотрудниками: двое в жёлтых касках, сотрудница в центре без каски."
        />
        <DetectionOverlay id={id} hidden={!visible} />
        {metadata && (
          <span className={styles['home-frame-coordinate']} aria-hidden="true">
            ВМ / 001
          </span>
        )}
      </div>
      <div className={styles['home-photo-controls']}>
        <span className={styles['home-frame-description']}>
          Контроль касок · пример анализа
        </span>
        <button
          className={styles['home-analysis-toggle']}
          type="button"
          aria-pressed={visible}
          aria-controls={id}
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <span className={styles['home-switch']} aria-hidden="true" />
          Показать анализ
        </button>
      </div>
      <figcaption className={common['home-disclosure']}>
        Демонстрационный сценарий · изображение создано ИИ
      </figcaption>
    </figure>
  )
}
