import { editorialStyles } from '@/shared/ui/editorial'
import { motionStyles } from '@/shared/lib/reveal'
import { PriceOffers } from './price-offers'
import styles from './prices-page.module.css'

export function PricesPage({ onDemoRequest }: { onDemoRequest: () => void }) {
  return (
    <>
      <section
        className={[
          editorialStyles['sub-hero'],
          editorialStyles['sub-hero-editorial'],
          motionStyles.reveal,
        ].join(' ')}
        aria-labelledby="prices-title"
        data-reveal=""
      >
        <div>
          <div className={editorialStyles['home-kicker']}>
            <span className={editorialStyles['home-section-number']}>03</span>
            Цены · форматы сотрудничества{' '}
          </div>
          <h1 id="prices-title">
            От первого пилота —<br />к вашей{' '}
            <span className={editorialStyles['ip-highlight']} data-highlight="">
              системе.
            </span>
          </h1>
        </div>
        <p className={editorialStyles['sub-lead']}>
          Масштаб проекта
          <br />
          определяет формат работы.
        </p>
      </section>
      <aside
        className={[
          editorialStyles['sub-disclaimer'],
          motionStyles.reveal,
        ].join(' ')}
        data-reveal=""
      >
        <span className={editorialStyles['sub-note-mark']} aria-hidden="true">
          i
        </span>
        <p>
          <strong>Суммы служат только для макета.</strong> Предложения и цены
          демонстрационные; реальная стоимость определяется после обсуждения
          задачи.{' '}
        </p>
      </aside>
      <PriceOffers onDemoRequest={onDemoRequest} />{' '}
      <section
        className={[
          editorialStyles['sub-section'],
          styles['price-factors'],
        ].join(' ')}
        aria-labelledby="price-factors-title"
      >
        <div
          className={[
            editorialStyles['sub-section-heading'],
            motionStyles.reveal,
          ].join(' ')}
          data-reveal=""
        >
          <div className={editorialStyles['home-kicker']}>
            01 / Из чего складывается проект
          </div>
          <h2 id="price-factors-title">
            Четыре фактора.
            <br />
            <span className={editorialStyles['home-muted-title']}>
              Одна задача.
            </span>
          </h2>
          <p>Обсуждаем объём до выбора формата.</p>
          <div className={styles['price-grid-art']} aria-hidden="true">
            <span>Камеры</span>
            <span>Сценарии</span>
            <span>Инфраструктура</span>
            <span>Интеграции</span>
            <i>+</i>{' '}
          </div>
        </div>
        <div
          className={[styles['price-factor-list'], motionStyles.reveal].join(
            ' ',
          )}
          data-reveal=""
        >
          <details>
            <summary>
              <span>01</span>Камеры
            </summary>{' '}
            <p>
              Количество камер, их расположение и качество исходного
              видеопотока.
            </p>
          </details>{' '}
          <details>
            <summary>
              <span>02</span>Сценарии
            </summary>{' '}
            <p>
              Задачи наблюдения и условия, в которых предстоит проверить подход.
            </p>
          </details>{' '}
          <details>
            <summary>
              <span>03</span>Инфраструктура
            </summary>{' '}
            <p>Условия обработки видео и требования к размещению решения.</p>
          </details>{' '}
          <details>
            <summary>
              <span>04</span>Интеграции
            </summary>{' '}
            <p>
              Требования к обмену данными с другими системами, если он нужен в
              проекте.{' '}
            </p>
          </details>{' '}
        </div>
      </section>
    </>
  )
}
