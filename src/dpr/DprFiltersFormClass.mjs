/* eslint-disable class-methods-use-this */
import DprFormValidationClass from './DprFormValidationClass.mjs'

export default class DprFiltersFormClass extends DprFormValidationClass {
  initFiltersForm({ formId, submitButtonId, resetButtonId }) {
    this.errorMessages = []

    // Main form
    this.mainForm = document.getElementById(formId)
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)
    this.errorSummary = document.getElementById('query-error-summary')

    // Buttons
    this.submitButton = document.getElementById(submitButtonId)
    this.resetButton = document.getElementById(resetButtonId)
    this.selectedFiltersButtons = document.querySelectorAll('.accordion-summary-remove-button')

    this.initValues()
    this.initSubmitButton()
    this.initResetButton()
    this.initFormData()
  }

  initValues() {
    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)
  }

  initFormData() {
    this.initFormValidation(this.formFields)
    this.mainForm.classList.remove('async-filters-form--hidden')
  }

  initSubmitButton() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.initFormData()
      this.validateForm()

      if (this.mainForm.checkValidity()) {
        this.submitAction()
      }
    })
  }

  initResetButton() {
    if (this.resetButton) {
      this.resetButton.addEventListener('click', (e) => {
        e.preventDefault()
        this.clearQueryParams()

        this.resetAction()
      })
    }
  }

  resetAction() {
    window.location.reload()
  }

  submitAction() {
    window.location.reload()
  }

  initSelectedFiltersButtons() {
    this.selectedFiltersButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const keys = JSON.parse(e.target.getAttribute('data-query-param-key'))
        const values = JSON.parse(e.target.getAttribute('data-query-param-value'))
        keys.forEach((key, index) => {
          this.updateQueryParam(key, values[index], 'delete')
          this.updateQueryParam('preventDefault', true)
        })
        window.location.reload()
      })
    })
  }
}
