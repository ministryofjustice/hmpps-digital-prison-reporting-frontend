import { DprClientClass } from './DprClientClass.mjs'

export default class DprLoadingClientClass extends DprClientClass {
  showLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.add('show')
    })

    document.querySelectorAll('button').forEach((b) => {
      b.disabled = true
    })

    document.querySelectorAll('.accordion-summary-remove-button').forEach((b) => {
      b.setAttribute('disabled', true)
    })

    document.querySelectorAll('.govuk-pagination__link').forEach((b) => {
      b.setAttribute('disabled', true)
      b.classList.add('disabled')
    })

    const pageSizeElement = document.getElementById('pageSize')
    if (pageSizeElement) {
      pageSizeElement.setAttribute('disabled', true)
    }

    document.querySelectorAll('.govuk-details.accordion-details').forEach((detailsButton) => {
      detailsButton.classList.add('disabled')
    })
  }

  hideLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.remove('show')
    })

    document.querySelectorAll('button').forEach((b) => {
      b.disabled = false
    })

    document.querySelectorAll('.accordion-summary-remove-button').forEach((b) => {
      b.setAttribute('disabled', false)
    })

    document.querySelectorAll('.govuk-pagination__link').forEach((b) => {
      console.log(b)
      b.setAttribute('disabled', false)
      b.classList.remove('disabled')
    })

    const pageSizeElement = document.getElementById('pageSize')
    if (pageSizeElement) {
      pageSizeElement.setAttribute('disabled', false)
    }
  }
}
