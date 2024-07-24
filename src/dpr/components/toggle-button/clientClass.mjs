import { DprClientClass } from '../../DprClientClass.mjs'

export default class ToggleButton extends DprClientClass {
  static getModuleName () {
    return 'toggle-button'
  }

  initialise () {
    this.initAllToggles()
    this.initToggleStateFromQueryParams()
  }

  // eslint-disable-next-line
  initAllToggles () {
    const toggles = document.getElementsByClassName('dpr-toggle-button')
    Array.from(toggles).forEach((toggle) => {
      const toggleContainer = toggle.parentNode.parentNode
      const contentContainers = Array.from(toggleContainer.getElementsByClassName('dpr-toggle-content'))
      const icons = Array.from(toggle.getElementsByClassName('dpr-icon-wrapper'))

      let active = ''
      icons.forEach((icon) => {
        icon.addEventListener('click', () => {
          icons.forEach((i) => {
            i.classList.remove('dpr-icon--active')
          })
          contentContainers.forEach((content) => {
            content.classList.remove('dpr-toggle-content--active')
          })

          active = icon.getAttribute('index')
          contentContainers[active].classList.add('dpr-toggle-content--active')
          icon.classList.add('dpr-icon--active')

          // Update Query Params
          const queryParams = new URLSearchParams(window.location.search)
          queryParams.set(toggle.id, active)
          window.history.replaceState(null, null, `?${queryParams.toString()}`)
        })
      })
    })
  }

  // eslint-disable-next-line
  initToggleStateFromQueryParams () {
    const urlParams = new URLSearchParams(window.location.search)

    urlParams.keys().forEach((key) => {
      const element = document.getElementById(key)
      if (element && element.classList.contains('dpr-toggle-button')) {
        console.log('is toggle', key)
        const value = urlParams.get(key)
        const icons = Array.from(element.getElementsByClassName('dpr-icon-wrapper'))

        const toggleContainer = element.parentNode.parentNode
        const contentContainers = Array.from(toggleContainer.getElementsByClassName('dpr-toggle-content'))

        icons.forEach((icon) => {
          const index = icon.getAttribute('index')
          if (value === index) {
            icon.classList.add('dpr-icon--active')
            contentContainers[index].classList.add('dpr-toggle-content--active')
          } else {
            icon.classList.remove('dpr-icon--active')
            contentContainers[index].classList.remove('dpr-toggle-content--active')
          }
        })
      }
    })
  }
}
