/* global IntersectionObserver */

export function createViewMotion(root) {
  const view = root.querySelector('#ipcam-view')
  const callout = root.querySelector('.ip-callout')
  let observer = null
  let motion = true
  let mounted = false

  function reveal(element) {
    element.dataset.revealed = 'true'
    if (element.hasAttribute('data-home-flow'))
      element.dataset.flowPlayed = 'true'
  }

  function disconnect() {
    observer?.disconnect()
    observer = null
  }

  function observe() {
    disconnect()
    const sections = [
      ...view.querySelectorAll(
        '[data-home-reveal], [data-home-flow], [data-reveal], [data-sequence]',
      ),
      callout,
    ]
    if (!motion || typeof IntersectionObserver === 'undefined') {
      sections.forEach(reveal)
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 },
    )
    sections
      .filter((section) => section.dataset.revealed !== 'true')
      .forEach((section) => observer.observe(section))
  }

  function mount() {
    mounted = true
    callout.dataset.reveal = ''
    observe()
  }

  function unmount() {
    disconnect()
    mounted = false
    delete callout.dataset.reveal
    delete callout.dataset.revealed
  }

  function setMotion(enabled) {
    motion = enabled
    if (mounted) observe()
  }

  return { mount, unmount, setMotion }
}
