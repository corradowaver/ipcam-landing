/* global document */

// Percentages refer to the uncropped 1536 × 1024 source, shared by both views.
const detections = [
  {
    x: 16.5,
    y: 20,
    width: 13,
    height: 47,
    state: 'helmet',
    label: 'Каска',
    delay: 300,
  },
  {
    x: 43.5,
    y: 36,
    width: 12,
    height: 48,
    state: 'missing',
    label: 'Без каски',
    delay: 620,
  },
  {
    x: 75,
    y: 37,
    width: 14,
    height: 46,
    state: 'helmet',
    label: 'Каска',
    delay: 940,
  },
]
const scenarioPhotos = [
  {
    key: 'factory-case',
    alt: 'Вид сверху со стационарной камеры: сотрудники в касках проверяют коробки на конвейере.',
  },
  {
    key: 'warehouse-case',
    alt: 'Вид сверху на склад: сотрудник перемещает паллету, сотрудница проверяет коробку.',
  },
  {
    key: 'construction-case',
    alt: 'Вид сверху на стройплощадку: два инженера в касках проверяют деталь и чертёж на рабочей поверхности.',
  },
]

function createDetection(item) {
  const box = document.createElement('span')
  box.className = 'home-detection'
  box.dataset.state = item.state
  Object.assign(box.style, {
    left: `${item.x}%`,
    top: `${item.y}%`,
    width: `${item.width}%`,
    height: `${item.height}%`,
  })
  box.style.setProperty('--detection-delay', `${item.delay}ms`)
  const label = document.createElement('span')
  label.className = 'home-detection-label'
  label.textContent = item.label
  box.append(label)
  return box
}

export function createPhotoScenes(root, photos) {
  root.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-analysis-toggle]')
    if (!toggle || !root.contains(toggle)) return
    const layer = root.querySelector(`#${toggle.getAttribute('aria-controls')}`)
    const enabled = toggle.getAttribute('aria-pressed') !== 'true'
    toggle.setAttribute('aria-pressed', String(enabled))
    layer.hidden = !enabled
  })

  function populate(scope) {
    scope.querySelectorAll('[data-home-photo], [data-photo]').forEach((img) => {
      img.src = photos[img.dataset.homePhoto || img.dataset.photo]
    })
    scope.querySelectorAll('[data-home-detections]').forEach((layer) => {
      layer.replaceChildren(...detections.map(createDetection))
    })
  }

  return { populate, scenario: (index) => scenarioPhotos[index] }
}
