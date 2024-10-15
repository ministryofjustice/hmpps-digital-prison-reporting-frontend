import DprFormValidationClass from '../../DprFormValidationClass.mjs'

export default class AsyncFilters extends DprFormValidationClass {
  static getModuleName() {
    return 'download-feedback-form'
  }

  initialise() {
    this.errorMessages = []
    this.mainForm = document.getElementById('download-feedback-form')
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)

    this.errorSummary = document.getElementById('download-feedback-form-summary')
    this.submitButton = document.getElementById('download-feedback-form-submit')
    this.success = document.getElementById('download-feedback-form-success')

    this.initSubmitButton()
    this.initFormValidation(this.formFields)
    this.mainForm.classList.remove('download-feedback-form--hidden')
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
