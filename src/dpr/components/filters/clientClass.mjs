import { DprClientClass } from '../../baseClientClass.mjs'

export class Filters extends DprClientClass {

  static getModuleName() {
    return "filters"
  }

  initialise() {
    const applyButton = this.getElement().querySelector('.filter-actions-apply-button')
    applyButton.addEventListener('click', this.applyButtonClick)

    const resetButton = this.getElement().querySelector('[data-reset-filters=true]')
    resetButton.addEventListener('click', this.resetButtonClick)

    const removeFilterButtons = document.getElementsByClassName('accordion-summary-remove-button')
    Array.from(removeFilterButtons).forEach((removeFilterButton) => {
      removeFilterButton.addEventListener('click', this.removeFilterButtonClick)
    })
  }

  applyButtonClick(e) {
    e.preventDefault()
    const filtersForm = document.getElementById('user-selected-filters-form')
    const filtersRegExp = /filters[.\w]+=[^&]*/g
    const pagingRegExp = /paging\.selectedPage=\d+/
    const ampRexExp = /(&)\1+/g

    let url = decodeURI(window.location.href)
      .replaceAll(filtersRegExp, '')
      .replace(pagingRegExp, 'paging.selectedPage=1')
    url += url.indexOf('?') === -1 ? '?' : '&'

    const formData = new FormData(filtersForm)
    let serializedFormData = ''
    formData.forEach((n, v) => {
      serializedFormData += `&${v}=${n}`
    })

    url += serializedFormData
    url = url.replaceAll('?&', '?').replaceAll(ampRexExp, '&')

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  }

  resetButtonClick(e) {
    e.preventDefault()
    const resetColsRegExp = /&?columns=[^&]*/g
    const columnsQuery = window.location.href.match(resetColsRegExp)
    let url = e.target.getAttribute('data-apply-base-url')
    if (columnsQuery) url += columnsQuery.join('')

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  }

  removeFilterButtonClick() {
    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })
  }
}
