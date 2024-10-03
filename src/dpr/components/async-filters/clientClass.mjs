import DprQueryParamClass from '../../DprQueryParamClass.mjs'

export default class AsyncFilters extends DprQueryParamClass {
  static getModuleName() {
    return 'async-filters'
  }

  initialise() {
    this.errorMessages = []
    this.mainForm = document.getElementById('async-filters-form')
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)

    this.errorSummary = document.getElementById('query-error-summary')
    this.submitButton = document.getElementById('async-request-report-button')
    this.resetButton = document.getElementById('async-request-reset-filters-button')

    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)

    this.initResetButton()
    this.initSubmitButton()
    this.initFormData()
  }

  initFormData() {
    const { origin, pathname, search } = window.location
    document.getElementById('async-filters-form-pathname').value = pathname
    document.getElementById('async-filters-form-origin').value = origin
    document.getElementById('async-filters-form-search').value = search

    const params = new URLSearchParams(search)
    document.getElementById('async-filters-form-href').value = `${origin}${pathname}?${params.toString()}`

    this.formFields.forEach((field) => {
      const formGroup = field.parentNode
      const errorMessageEl = formGroup.querySelector('p.govuk-error-message')

      if (errorMessageEl) {
        formGroup.classList.remove('govuk-form-group--error')
        errorMessageEl.classList.add('govuk-error-message--hidden')
        field.classList.remove('govuk-input--error')
      }
    })
  }

  initSubmitButton() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.initFormData()
      this.validateForm()

      if (this.mainForm.checkValidity()) {
        this.mainForm.requestSubmit()
      }
    })
  }

  validateForm() {
    this.errorMessages = []
    this.formFields.forEach((field) => {
      const formGroupEl = field.parentNode
      const errorMessageElementEl = formGroupEl.querySelector('p.govuk-error-message')

      if (!field.checkValidity()) {
        this.showFieldError(field, formGroupEl, errorMessageElementEl)
      } else if (errorMessageElementEl && formGroupEl) {
        this.hideFieldError(field, formGroupEl, errorMessageElementEl)
      }
    })

    if (this.errorMessages.length) {
      this.buildErrorSummary()
      this.errorSummary.classList.remove('query-error-summary--hidden')
    } else {
      this.errorSummary.classList.add('query-error-summary--hidden')
    }
  }

  showFieldError(field, formGroupEl, errorMessageElementEl) {
    formGroupEl.classList.add('govuk-form-group--error')
    const message = this.setValidationMessage(field.validity, field)

    // eslint-disable-next-line no-param-reassign
    errorMessageElementEl.innerText = message
    errorMessageElementEl.classList.remove('govuk-error-message--hidden')
    field.classList.add('govuk-input--error')
  }

  hideFieldError(field, formGroupEl, errorMessageElementEl) {
    formGroupEl.classList.remove('govuk-form-group--error')
    errorMessageElementEl.classList.add('govuk-error-message--hidden')
    field.classList.remove('govuk-input--error')
  }

  buildErrorSummary() {
    const errorSummaryBody = this.errorSummary.querySelector('div.govuk-error-summary__body')
    let messages = ''
    this.errorMessages.forEach((m) => {
      messages += `<li><a href="${m.href}">${m.text}</a></li>`
    })
    const errorMessages = `<ul class="govuk-list govuk-error-summary__list">${messages}</ul>`
    errorSummaryBody.innerHTML = errorMessages
  }

  setValidationMessage(validityState, field) {
    const inputId = field.getAttribute('id')
    const displayName = field.getAttribute('display-name')
    let message

    if (validityState.valueMissing) {
      message = `${displayName} is required`
      this.errorMessages.push({
        text: message,
        href: `#${inputId}`,
      })
    }

    if (validityState.patternMismatch) {
      const pattern = field.getAttribute('pattern')
      message = `This value for ${displayName} must include the correct pattern: ${pattern}`
      this.errorMessages.push({
        text: message,
        href: `#${inputId}`,
      })
    }

    return message
  }

  initResetButton() {
    if (this.resetButton) {
      this.resetButton.addEventListener('click', (e) => {
        e.preventDefault()
        this.clearQueryParams()
        window.location.reload()
      })
    }
  }
}
