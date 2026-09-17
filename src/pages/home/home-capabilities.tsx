import { Icon } from '@/shared/ui/icon'
import styles from './home-page.module.css'
const capabilities = [
  {
    title: 'Обнаружение людей',
    description: 'Выделяем присутствие человека в зоне видимости камеры.',
    icon: 'scan',
  },
  {
    title: 'Отслеживание движения',
    description: 'Связываем обнаружения, чтобы видеть перемещение в кадре.',
    icon: 'move',
  },
  {
    title: 'Наглядный интерфейс',
    description: 'Показываем результат анализа поверх исходного видео.',
    icon: 'monitor',
  },
] as const
export function HomeCapabilities() {
  return (
    <ol className={styles['home-capability-list']}>
      {capabilities.map((item, index) => (
        <li key={item.title}>
          <span className={styles['home-row-number']}>0{index + 1}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <span className={styles['home-row-icon']}>
            <Icon name={item.icon} size={20} />
          </span>
        </li>
      ))}
    </ol>
  )
}
