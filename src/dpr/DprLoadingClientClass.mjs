import { DprClientClass } from './DprClientClass.mjs'

export class DprLoadingClientClass extends DprClientClass {
  constructor(element) {
    super(element)
  }

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

    document.getElementById('pageSize').setAttribute('disabled', true)
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

    document.getElementById('pageSize').setAttribute('disabled', false)
  }
}
