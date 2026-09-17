import { editorialStyles } from '@/shared/ui/editorial'
import { Icon } from '@/shared/ui/icon'
import { motionStyles } from '@/shared/lib/reveal'
import { scenePhotos } from '@/shared/assets/scenes'
import styles from './about-page.module.css'

export function AboutPage({ links }: { links: { services: string } }) {
  return (
    <>
      <section
        className={[
          editorialStyles['sub-hero'],
          editorialStyles['sub-hero-editorial'],
          motionStyles.reveal,
        ].join(' ')}
        aria-labelledby="about-title"
        data-reveal=""
      >
        <div>
          <div className={editorialStyles['home-kicker']}>
            <span className={editorialStyles['home-section-number']}>04</span>О
            компании · Вместе{' '}
          </div>
          <h1 id="about-title">
            Технологии работают
            <br />в контексте{' '}
            <span className={editorialStyles['ip-highlight']} data-highlight="">
              людей.
            </span>
          </h1>
        </div>
        <p className={editorialStyles['sub-lead']}>
          Внимание к тому,
          <br />
          что происходит в кадре.
        </p>
      </section>
      <section
        className={styles['about-observation']}
        aria-labelledby="about-idea-title"
      >
        <figure data-reveal="" className={motionStyles.reveal}>
          <div className={editorialStyles['home-frame-meta']}>
            <span>Наблюдение / Производственная линия</span>
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
              alt="Вид с верхней точки на работников и производственный конвейер."
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
        <div
          className={[styles['about-statement'], motionStyles.reveal].join(' ')}
          data-reveal=""
        >
          <div className={editorialStyles['home-kicker']}>01 / Наша идея</div>
          <h2 id="about-idea-title">
            Сначала наблюдение.
            <br />
            <span className={editorialStyles['home-muted-title']}>
              Затем решение.
            </span>
          </h2>
          <p>
            Смысл видеоаналитики появляется там, где есть конкретный вопрос к
            происходящему.{' '}
          </p>
          <span className={styles['about-cross']} aria-hidden="true">
            +
          </span>
        </div>
      </section>
      <section
        className={editorialStyles['sub-section']}
        aria-labelledby="about-principles-title"
      >
        <div
          className={[
            editorialStyles['sub-section-head'],
            motionStyles.reveal,
          ].join(' ')}
          data-reveal=""
        >
          <div>
            <div className={editorialStyles['home-kicker']}>
              02 / Инженерный подход
            </div>
            <h2 id="about-principles-title">
              Понятная последовательность.
              <br />
              <span className={editorialStyles['home-muted-title']}>
                Проверяемые решения.
              </span>
            </h2>
          </div>
        </div>
        <div
          className={[styles['about-principles'], motionStyles.sequence].join(
            ' ',
          )}
          data-sequence=""
        >
          <article>
            <span className={styles['about-principle-index']}>
              01 <Icon name="scan" />
            </span>
            <h3>Наблюдаемые факты</h3>
            <p>
              Отталкиваемся от того, что действительно видно в исходном кадре.
            </p>
          </article>
          <article>
            <span className={styles['about-principle-index']}>
              02 <Icon name="move" />
            </span>
            <h3>Проверка на данных</h3>
            <p>Проверяем подход на видео в условиях выбранной площадки.</p>
          </article>
          <article>
            <span className={styles['about-principle-index']}>
              03 <Icon name="monitor" />
            </span>
            <h3>Понятный интерфейс</h3>
            <p>Сохраняем связь результата анализа с исходным видеопотоком.</p>
          </article>
        </div>
      </section>
      <section
        className={[
          editorialStyles['sub-section'],
          styles['about-journey'],
        ].join(' ')}
        aria-labelledby="about-journey-title"
      >
        <div
          className={[
            editorialStyles['sub-section-head'],
            motionStyles.reveal,
          ].join(' ')}
          data-reveal=""
        >
          <div>
            <div className={editorialStyles['home-kicker']}>
              03 / Этапы сотрудничества
            </div>
            <h2 id="about-journey-title">
              Двигаемся
              <br />
              <span className={editorialStyles['home-muted-title']}>
                последовательно.
              </span>
            </h2>
          </div>
          <a
            href={links.services}
            className={editorialStyles['home-text-link']}
          >
            Как устроена работа <span aria-hidden="true">↗</span>
          </a>{' '}
        </div>
        <ol
          className={[
            [editorialStyles['sub-sequence'], styles['sub-sequence']].join(' '),
            motionStyles.sequence,
          ].join(' ')}
          data-sequence=""
        >
          <li>
            <span>01</span> <h3>Задача</h3>
            <p>Формулируем вопрос к видео.</p>
          </li>
          <li>
            <span>02</span> <h3>Пилот</h3>
            <p>Проверяем подход на примере.</p>
          </li>
          <li>
            <span>03</span> <h3>Оценка</h3>
            <p>Разбираем результат и ограничения.</p>
          </li>
          <li>
            <span>04</span> <h3>Развитие</h3>
            <p>Определяем следующий шаг.</p>
          </li>
        </ol>
      </section>
    </>
  )
}
