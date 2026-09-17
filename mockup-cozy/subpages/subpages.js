const serviceDescriptions = [
  'Разбираем задачу, условия съёмки и то, что нужно увидеть в кадре.',
  'Проверяем подход на выбранном видео и обсуждаем границы его применимости.',
  'Согласуем, как исходное видео попадёт в анализ и интерфейс наблюдения.',
  'Определяем следующий шаг с учётом результатов проверки.',
]
const caseAnchors = ['factory', 'warehouse', 'construction']

function renderServiceStage(item, index) {
  return `<details class="service-stage" data-reveal ${index === 0 ? 'open' : ''}>
    <summary><span>0${index + 1}</span><h3>${item.title}</h3></summary>
    <div class="service-stage-body"><p>${serviceDescriptions[index]}</p><span class="service-stage-result">${item.result}</span></div>
  </details>`
}

function renderCaseStudy(item, index, photo) {
  return `<article class="case-study" id="case-${caseAnchors[index]}" aria-labelledby="case-title-${index}">
    <figure data-reveal><div class="home-frame-meta"><span>Наблюдение / Сценарий 0${index + 1}</span><span aria-hidden="true">ВМ / 0${index + 1}</span></div>
    <div class="home-photo-frame home-corners"><img data-photo="${photo.key}" width="1536" height="1024" loading="lazy" alt="${photo.alt}" /></div><figcaption class="home-disclosure">Демонстрационный сценарий · изображение создано ИИ</figcaption></figure>
    <div class="case-study-content" data-reveal><div class="case-study-index">0${index + 1} / Контекст наблюдения</div><h2 id="case-title-${index}">${item.title}</h2><p class="case-study-task">${item.task}</p>
    <details><summary>Разобрать сценарий<span class="home-sr-only">: ${item.title}</span></summary><div class="case-study-detail"><strong>Подход</strong><p>${item.approach}</p><strong>Ожидаемый результат</strong><p>${item.outcome}</p></div></details></div>
  </article>`
}

function renderPriceOffer(item, index) {
  return `<article class="price-offer" data-featured="${item.featured}" data-reveal>
    <div class="price-offer-index"><span>0${index + 1} / Формат проекта</span><span aria-hidden="true"></span></div>
    <div class="price-offer-main"><h2>${item.title}</h2><div class="price-offer-value">${item.price}</div><div class="price-offer-caption">${item.caption}</div></div>
    <ul>${item.items.map((text) => `<li>${text}</li>`).join('')}</ul>
    <button class="ip-button ${item.featured ? '' : 'ip-button-secondary'}" type="button" data-demo>Запросить демо <span aria-hidden="true">↗</span></button>
  </article>`
}

export function createSubpagesView(root, photoScenes, cases, services, prices) {
  const view = root.querySelector('#ipcam-view')
  function mount(page) {
    if (page === 'services')
      view.querySelector('[data-service-stages]').innerHTML = services
        .map(renderServiceStage)
        .join('')
    if (page === 'cases')
      view.querySelector('[data-case-studies]').innerHTML = cases
        .map((item, index) =>
          renderCaseStudy(item, index, photoScenes.scenario(index)),
        )
        .join('')
    if (page === 'prices')
      view.querySelector('[data-price-offers]').innerHTML = prices
        .map(renderPriceOffer)
        .join('')
  }
  return { mount }
}
