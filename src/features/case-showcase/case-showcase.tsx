import { scenePhotos } from '@/shared/assets/scenes'
import { editorialStyles as common } from '@/shared/ui/editorial'
import { motionStyles } from '@/shared/lib/reveal'
import { cases } from './cases'
import styles from './case-showcase.module.css'

export function CaseShowcase({ detailed = false }: { detailed?: boolean }) {
  const kind = detailed ? 'case-study' : 'home-case'
  const Heading = detailed ? 'h2' : 'h3'
  return (
    <section
      className={detailed ? undefined : styles['home-case-grid']}
      aria-label="Демонстрационные кейсы"
    >
      {cases.map((item, index) => (
        <article
          key={item.anchor}
          id={`case-${item.anchor}`}
          aria-labelledby={`case-title-${item.anchor}`}
          className={[styles[kind], detailed ? '' : motionStyles.reveal].join(
            ' ',
          )}
          data-reveal={detailed ? undefined : ''}
        >
          <CasePhoto item={item} index={index} detailed={detailed} />
          <div
            className={[
              styles[`${kind}-content`],
              detailed ? motionStyles.reveal : '',
            ].join(' ')}
            data-reveal={detailed ? '' : undefined}
          >
            {detailed && (
              <div className={styles['case-study-index']}>
                0{index + 1} / Контекст наблюдения
              </div>
            )}
            <div className={detailed ? undefined : styles['home-case-heading']}>
              <Heading id={`case-title-${item.anchor}`}>{item.title}</Heading>
              {!detailed && <span aria-hidden="true">/ 0{index + 1}</span>}
            </div>
            <p className={styles[`${kind}-task`]}>{item.task}</p>
            <details>
              <summary>
                Разобрать сценарий
                <span className={common['home-sr-only']}>: {item.title}</span>
              </summary>
              <div className={styles[`${kind}-detail`]}>
                <strong>Подход</strong>
                <p>{item.approach}</p>
                <strong>Ожидаемый результат</strong>
                <p>{item.outcome}</p>
              </div>
            </details>
          </div>
        </article>
      ))}
    </section>
  )
}

function CasePhoto({
  item,
  index,
  detailed,
}: {
  item: (typeof cases)[number]
  index: number
  detailed: boolean
}) {
  return (
    <figure
      className={detailed ? motionStyles.reveal : undefined}
      data-reveal={detailed ? '' : undefined}
    >
      {detailed && (
        <div className={common['home-frame-meta']}>
          <span>Наблюдение / Сценарий 0{index + 1}</span>
          <span aria-hidden="true">ВМ / 0{index + 1}</span>
        </div>
      )}
      <div
        className={[
          [common['home-photo-frame'], styles['home-photo-frame']].join(' '),
          common['home-corners'],
        ].join(' ')}
      >
        <img
          src={scenePhotos[item.photo]}
          width="1536"
          height="1024"
          loading="lazy"
          alt={item.alt}
        />
      </div>
      <figcaption className={common['home-disclosure']}>
        Демонстрационный сценарий · изображение создано ИИ
      </figcaption>
    </figure>
  )
}
