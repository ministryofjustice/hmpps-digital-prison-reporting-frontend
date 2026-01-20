/* eslint-disable class-methods-use-this */
import DprQueryParamClass from './DprQueryParamClass'

class DprFormValidationClass extends DprQueryParamClass {
  initFormValidation(formFields) {
    formFields.forEach((field) => {
      const formGroup = field.closest('div.govuk-form-group')
      if (formGroup) {
        const errorMessageEl = formGroup.querySelector('p.govuk-error-message')
        if (errorMessageEl) {
          formGroup.classList.remove('govuk-form-group--error')
          errorMessageEl.classList.add('govuk-error-message--hidden')
          field.classList.remove('govuk-input--error')
          field.classList.remove('govuk-textarea--error')
          field.classList.remove('govuk-select--error')
        }
      }
    })
  }

  validateForm() {
    this.errorMessages = []
    let prevfieldName = ''
    this.formFields.forEach((field) => {
      const currentFieldName = field.getAttribute('name')
      if (currentFieldName !== prevfieldName && field.tagName !== 'BUTTON') {
        const formGroupEl = field.closest('div.govuk-form-group')

        if (formGroupEl) {
          const errorMessageEl = formGroupEl.querySelector('p.govuk-error-message')
          if (!this.fieldIsValid(field)) {
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

    return this.errorMessages
  }

  fieldIsValid(field) {
    const { type } = field
    switch (type) {
      case 'checkbox':
        return this.validateCheckbox(field)
      default:
        return field.checkValidity()
    }
  }

  validateCheckbox(field) {
    const checkboxWrapper = field.closest('div.govuk-checkboxes')
    if (checkboxWrapper.hasAttribute('required')) {
      const checkboxes = checkboxWrapper.querySelectorAll('input[type="checkbox"]')
      return Array.from(checkboxes).some((x) => x.checked)
    }
    return true
  }

  showFieldError(field, formGroupEl, errorMessageEl) {
    formGroupEl.classList.add('govuk-form-group--error')
    const message = this.setValidationMessage(field.validity, field, errorMessageEl)

    // eslint-disable-next-line no-param-reassign
    errorMessageEl.innerHTML = `<span class="govuk-visually-hidden">Error:</span>${message}`
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
      case 'checkbox':
        return field.closest('div.govuk-checkboxes').getAttribute('display-name')
      default:
        return field.getAttribute('display-name')
    }
  }

  setValidationMessage(validityState, field, errorMessageEl) {
    const existingErrorMessage = errorMessageEl.lastChild.nodeValue.replace(/(\r\n|\n|\r)/gm, '').trim()
    const inputId = field.getAttribute('id')
    const displayName = this.getDisplayName(field)
    let message

    if (validityState.valueMissing || field.type === 'checkbox') {
      message = existingErrorMessage.length ? existingErrorMessage : `${displayName} is required`
      this.errorMessages.push({
        text: message,
        href: `#${inputId}`,
      })
    }

    if (validityState.patternMismatch) {
      const pattern = field.getAttribute('pattern-hint') || field.getAttribute('pattern')
      message = existingErrorMessage.length
        ? existingErrorMessage
        : `The value for ${displayName} must be in the correct pattern: ${pattern}`
      this.errorMessages.push({
        text: message,
        href: `#${inputId}`,
      })
    }

    return message
  }
}

export { DprFormValidationClass }
export default DprFormValidationClass