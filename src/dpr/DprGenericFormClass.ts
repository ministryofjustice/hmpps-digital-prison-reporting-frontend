// @ts-nocheck
import DprFormValidationClass from './DprFormValidationClass'

class DprGenericForm extends DprFormValidationClass {
  static getModuleName() {
    return 'dpr-generic-form'
  }

  initialise() {
    this.errorMessages = []
    this.mainForm = document.getElementById('dpr-form')
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)

    this.errorSummary = document.getElementById('dpr-form-summary--error-summary')
    this.submitButton = document.getElementById('dpr-form-summary--form-submit')

    this.initSubmitButton()
    this.initFormValidation(this.formFields)
    this.mainForm.classList.remove('dpr-form--hidden')
  }

  initSubmitButton() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.validateForm()

      if (this.mainForm.checkValidity()) {
        this.mainForm.requestSubmit()
      }
    })
  }
}

export { DprGenericForm }
export default DprGenericForm
