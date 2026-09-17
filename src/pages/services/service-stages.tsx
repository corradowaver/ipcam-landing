import { motionStyles } from '@/shared/lib/reveal'
import styles from './services-page.module.css'
const services = [
  {
    title: 'Обследование задачи',
    description:
      'Разбираем задачу, условия съёмки и то, что нужно увидеть в кадре.',
    result: 'Результат: задача и критерии пилота.',
  },
  {
    title: 'Пилот видеоаналитики',
    description:
      'Проверяем подход на выбранном видео и обсуждаем границы его применимости.',
    result: 'Результат: демонстрация и ограничения.',
  },
  {
    title: 'Подключение видеопотоков',
    description:
      'Согласуем, как исходное видео попадёт в анализ и интерфейс наблюдения.',
    result: 'Результат: схема подключения.',
  },
  {
    title: 'Развитие решения',
    description: 'Определяем следующий шаг с учётом результатов проверки.',
    result: 'Результат: план следующего этапа.',
  },
]

export function ServiceStages() {
  return (
    <div aria-label="Направления работы">
      {services.map((item, index) => (
        <details
          key={item.title}
          className={[styles['service-stage'], motionStyles.reveal].join(' ')}
          data-reveal=""
          open={index === 0}
        >
          <summary>
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
          </summary>
          <div className={styles['service-stage-body']}>
            <p>{item.description}</p>
            <span className={styles['service-stage-result']}>
              {item.result}
            </span>
          </div>
        </details>
      ))}
    </div>
  )
}
