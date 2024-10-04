/* eslint-disable class-methods-use-this */
import DprQueryParamClass from './DprQueryParamClass.mjs'

export default class DprFormValidationClass extends DprQueryParamClass {
  initFormValidation(formFields) {
    formFields.forEach((field) => {
      const formGroup = field.closest('div.govuk-form-group')
      if (formGroup) {
        const errorMessageEl = formGroup.querySelector('p.govuk-error-message')
        if (errorMessageEl) {
          formGroup.classList.remove('govuk-form-group--error')
          errorMessageEl.classList.add('govuk-error-message--hidden')
          field.classList.remove('govuk-input--error')
          this.hideFieldError(field, formGroup, errorMessageEl)
        }
      }
    })
  }

  validateForm() {
    this.errorMessages = []
    let prevfieldName = ''
    this.formFields.forEach((field) => {
      const currentFieldName = field.getAttribute('name')

      if (currentFieldName !== prevfieldName) {
        const formGroupEl = field.closest('div.govuk-form-group')

        if (formGroupEl) {
          const errorMessageEl = formGroupEl.querySelector('p.govuk-error-message')

          if (!field.checkValidity()) {
            this.showFieldError(field, formGroupEl, errorMessageEl)
          } else if (errorMessageEl && formGroupEl) {
            this.hideFieldError(field, formGroupEl, errorMessageEl)
          }
        }
      }
      prevfieldName = field.getAttribute('name')
    })

    if (this.errorMessages.length) {
      this.buildErrorSummary()
      this.errorSummary.classList.remove('query-error-summary--hidden')
    } else {
      this.errorSummary.classList.add('query-error-summary--hidden')
    }
  }

  showFieldError(field, formGroupEl, errorMessageEl) {
    formGroupEl.classList.add('govuk-form-group--error')
    const message = this.setValidationMessage(field.validity, field)

    // eslint-disable-next-line no-param-reassign
    errorMessageEl.innerText = message
    errorMessageEl.classList.remove('govuk-error-message--hidden')
    field.classList.add('govuk-input--error')
  }

  hideFieldError(field, formGroupEl, errorMessageEl) {
    formGroupEl.classList.remove('govuk-form-group--error')
    errorMessageEl.classList.add('govuk-error-message--hidden')
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

  getDisplayName(field) {
    const type = field.getAttribute('type')
    switch (type) {
      case 'text':
        return field.getAttribute('display-name')
      case 'radio':
        return field.closest('div.govuk-radios').getAttribute('display-name')
      default:
        return field.getAttribute('display-name')
    }
  }

  setValidationMessage(validityState, field) {
    const inputId = field.getAttribute('id')
    const displayName = this.getDisplayName(field)
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
}