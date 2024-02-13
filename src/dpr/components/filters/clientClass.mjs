import { DprClientClass } from '../../baseClientClass.mjs'

export class Filters extends DprClientClass {

  static getModuleName() {
    return "filters"
  }

  initialise() {
    const applyButton = this.getElement().querySelector('.filter-actions-apply-button')
    const filters = [...this.getElement().querySelectorAll('input, select')]

    let baseUrl = this.getElement().dataset.baseUrl
    if (baseUrl.indexOf('?') === -1) {
      baseUrl += '?'
    } else {
      baseUrl += '&'
    }

    applyButton.addEventListener('click', () => {
      let url = baseUrl
        + filters
          .map(filter => `${filter.name}=${filter.value}`)
          .join('&')

      url = url
        .replaceAll('?&', '?')
        .replaceAll('&&', '&')

      window.location.href = url
    })
  }
}
