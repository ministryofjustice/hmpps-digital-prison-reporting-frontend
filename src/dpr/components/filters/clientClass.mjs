import { DprLoadingClientClass } from '../../DprLoadingClientClass.mjs'

export class Filters extends DprLoadingClientClass {

  static getModuleName() {
    return "filters"
  }

  initialise() {
    const applyButton = this.getElement().querySelector('.filter-actions-apply-button')
    applyButton.addEventListener('click', (e) => {
      this.showLoadingAnimation()
      this.applyButtonClick(e)
    })

    const resetButton = this.getElement().querySelector('[data-reset-filters=true]')
    resetButton.addEventListener('click', (e) => {
      this.showLoadingAnimation()
      this.resetButtonClick(e, this.hideLoadingAnimation)
    })

    document.querySelectorAll('.accordion-summary-remove-button').forEach((removeFilterButton) => {
      removeFilterButton.addEventListener('click', () => {
        this.showLoadingAnimation()
      })
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

    window.location.href = url
  }

  resetButtonClick(e, hideLoadingAnimation) {
    e.preventDefault()
    const resetColsRegExp = /&?columns=[^&]*/g
    const columnsQuery = window.location.href.match(resetColsRegExp)
    let url = e.target.getAttribute('data-apply-base-url')
    if (columnsQuery) url += columnsQuery.join('')

    if (url === window.location.href) {
      hideLoadingAnimation()
    } else {
      window.location.href = url
    }
  }
}
