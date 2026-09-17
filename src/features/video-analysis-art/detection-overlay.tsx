import type { CSSProperties } from 'react'
import styles from './video-analysis-art.module.css'

// Positions refer to the uncropped CCTV source (1536 × 1024).
const detections = [
  { x: 16.5, y: 20, width: 13, height: 47, missing: false, delay: 300 },
  { x: 43.5, y: 36, width: 12, height: 48, missing: true, delay: 620 },
  { x: 75, y: 37, width: 14, height: 46, missing: false, delay: 940 },
]

export function DetectionOverlay({
  id,
  hidden,
  small = false,
}: {
  id?: string
  hidden?: boolean
  small?: boolean
}) {
  return (
    <div
      id={id}
      hidden={hidden}
      aria-hidden="true"
      data-testid="analysis-overlay"
      className={[
        styles['home-detections'],
        small ? styles['home-detections-small'] : '',
      ].join(' ')}
    >
      {detections.map((item) => (
        <span
          key={item.x}
          className={styles['home-detection']}
          data-state={item.missing ? 'missing' : 'helmet'}
          style={
            {
              left: `${String(item.x)}%`,
              top: `${String(item.y)}%`,
              width: `${String(item.width)}%`,
              height: `${String(item.height)}%`,
              '--detection-delay': `${String(item.delay)}ms`,
            } as CSSProperties
          }
        >
          <span className={styles['home-detection-label']}>
            {item.missing ? 'Без каски' : 'Каска'}
          </span>
        </span>
      ))}
    </div>
  )
}
