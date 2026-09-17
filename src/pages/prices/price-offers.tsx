import { ActionButton } from '@/shared/ui/action-button'
import { motionStyles } from '@/shared/lib/reveal'
import styles from './prices-page.module.css'
const prices = [
  {
    title: 'Пилот',
    price: '49 000 ₽',
    caption: 'за проект · демонстрационная цена',
    items: [
      'Обсуждение сценария',
      'Ограниченный объём видео',
      'Разбор результата',
    ],
    featured: false,
  },
  {
    title: 'Внедрение',
    price: '149 000 ₽',
    caption: 'за проект · демонстрационная цена',
    items: ['Согласование объёма', 'Потоки и интерфейс', 'Проверка сценария'],
    featured: true,
  },
  {
    title: 'Масштабирование',
    price: 'По запросу',
    caption: 'демонстрационное предложение',
    items: [
      'Несколько площадок',
      'План инфраструктуры',
      'Требования интеграций',
    ],
    featured: false,
  },
]

export function PriceOffers({ onDemoRequest }: { onDemoRequest: () => void }) {
  return (
    <section
      className={styles['price-offers']}
      aria-label="Демонстрационные предложения"
    >
      {prices.map((item, index) => (
        <article
          key={item.title}
          className={[styles['price-offer'], motionStyles.reveal].join(' ')}
          data-featured={item.featured}
          data-reveal=""
        >
          <div className={styles['price-offer-index']}>
            <span>0{index + 1} / Формат проекта</span>
            <span aria-hidden="true" />
          </div>
          <div className={styles['price-offer-main']}>
            <h2>{item.title}</h2>
            <div className={styles['price-offer-value']}>{item.price}</div>
            <div className={styles['price-offer-caption']}>{item.caption}</div>
          </div>
          <ul>
            {item.items.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <ActionButton
            variant={item.featured ? 'primary' : 'secondary'}
            onClick={onDemoRequest}
          >
            Запросить демо <span aria-hidden="true">↗</span>
          </ActionButton>
        </article>
      ))}
    </section>
  )
}
