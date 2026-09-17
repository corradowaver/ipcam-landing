const capabilityDescriptions = [
  'Выделяем присутствие человека в зоне видимости камеры.',
  'Связываем обнаружения, чтобы видеть перемещение в кадре.',
  'Показываем результат анализа поверх исходного видео.',
]
function renderHomeCase(item, index, photo) {
  return `<article class="home-case" data-home-reveal>
    <figure><div class="home-photo-frame home-corners"><img data-home-photo="${photo.key}" width="1536" height="1024" loading="lazy" alt="${photo.alt}" /></div>
    <figcaption class="home-disclosure">Демонстрационный сценарий · изображение создано ИИ</figcaption></figure>
    <div class="home-case-content"><div class="home-case-heading"><h3>${item.title}</h3><span aria-hidden="true">/ 0${index + 1}</span></div>
    <p class="home-case-task">${item.task}</p>
    <details><summary>Разобрать сценарий<span class="home-sr-only">: ${item.title}</span></summary>
    <div class="home-case-detail"><strong>Подход</strong><p>${item.approach}</p><strong>Ожидаемый результат</strong><p>${item.outcome}</p></div></details></div>
  </article>`
}

export function createHomeView(root, photoScenes, cases, capabilities) {
  const view = root.querySelector('#ipcam-view')
  function mount() {
    view.querySelector('[data-home-cases]').innerHTML = cases
      .map((item, index) =>
        renderHomeCase(item, index, photoScenes.scenario(index)),
      )
      .join('')
    view.querySelector('[data-home-capabilities]').innerHTML = capabilities
      .map(
        (item, index) =>
          `<li><span class="home-row-number">0${index + 1}</span><div><h3>${item.title}</h3><p>${capabilityDescriptions[index]}</p></div><span class="home-row-icon"><i data-lucide="${item.icon}" aria-hidden="true"></i></span></li>`,
      )
      .join('')
  }
  return { mount }
}
