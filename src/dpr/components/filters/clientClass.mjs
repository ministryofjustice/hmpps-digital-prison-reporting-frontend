/* global dayjs */

import { DprClientClass } from '../../DprClientClass.mjs'

export default class Filters extends DprClientClass {
  static getModuleName() {
    return 'filters'
  }

  initialise() {
    const applyButton = this.getElement().querySelector('.filter-actions-apply-button')
    applyButton.addEventListener('click', (e) => {
      this.loadingHelper.showLoadingAnimation()
      this.applyButtonClick(e)
    })

    const resetButton = this.getElement().querySelector('[data-reset-filters=true]')
    resetButton.addEventListener('click', (e) => {
      this.loadingHelper.showLoadingAnimation()
      this.resetButtonClick(e, this.loadingHelper.hideLoadingAnimation)
    })

    document.querySelectorAll('.accordion-summary-remove-button').forEach((removeFilterButton) => {
      removeFilterButton.addEventListener('click', () => {
        this.loadingHelper.showLoadingAnimation()
      })
    })

    this.mainForm = document.getElementById('user-selected-filters-form')
    this.formFields = Array.from(this.mainForm.elements)
    this.initFormValidation()
  }

  applyButtonClick(e) {
    e.preventDefault()
    const filtersForm = document.getElementById('user-selected-filters-form')
    const filtersRegExp = /filters[.\w]+=[^&]*/g
    const pagingRegExp = /selectedPage=\d+/
    const ampRexExp = /(&)\1+/g

    if (filtersForm.reportValidity()) {
      let url = decodeURI(window.location.href).replaceAll(filtersRegExp, '').replace(pagingRegExp, 'selectedPage=1')
      url += url.indexOf('?') === -1 ? '?' : '&'

      const formData = new FormData(filtersForm)
      let serializedFormData = ''
      document.querySelectorAll('.autocomplete-text-input-box').forEach((input) => {
        if(input.staticOptionValue) {
          formData.set(input.name, input.staticOptionValue)
        }
      })
      formData.forEach((v, n) => {
        const dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/

        if (v.match(dateRegEx)) {
          // eslint-disable-next-line no-param-reassign
          v = dayjs(v, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        serializedFormData += `&${n}=${v}`

      })

      url += serializedFormData
      url = url.replaceAll('?&', '?').replaceAll(ampRexExp, '&')

      window.location.href = url
    } else {
      this.loadingHelper.hideLoadingAnimation()
    }
  }

  initFormValidation() {
    this.formFields.forEach((field) => {
      const formGroup = field.closest('div.govuk-form-group')
      if (formGroup) {
        const errorMessageEl = formGroup.querySelector('p.govuk-error-message')
        if (errorMessageEl) {
          formGroup.classList.remove('govuk-form-group--error')
          errorMessageEl.classList.add('govuk-error-message--hidden')
          field.classList.remove('govuk-input--error')
        }
      }
    })
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
