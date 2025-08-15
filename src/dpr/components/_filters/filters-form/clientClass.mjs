/* eslint-disable class-methods-use-this */
import DprFormValidationClass from '../../../DprFormValidationClass.mjs'

export default class DprFiltersFormClass extends DprFormValidationClass {
  initFiltersForm({ formId, submitButtonId, resetButtonId, selectedFiltersId, removeSelectedButtonClass }) {
    this.errorMessages = []

    // Main form
    this.mainForm = document.getElementById(formId)
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)
    this.errorSummary = document.getElementById('query-error-summary')

    // Buttons
    this.submitButton = document.getElementById(submitButtonId)
    this.selectedFiltersWrapper = document.getElementById(selectedFiltersId)
    this.selectedFiltersButtons = document.querySelectorAll(`.${removeSelectedButtonClass}`)

    this.initValues()
    this.initSubmitButton()
    this.initResetButton(resetButtonId)
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
      const errors = this.validateForm()
      if (this.mainForm.checkValidity() && errors.length === 0) {
        this.submitAction()
      }
    })
  }

  initResetButton(resetButtonId) {
    this.resetButton = document.getElementById(resetButtonId)
    if (this.resetButton) {
      this.defaultQuery = this.resetButton.getAttribute('defaultQuery')
      this.resetButton.addEventListener('click', (e) => {
        e.preventDefault()
        this.clearQueryParams('filters')
        this.resetAction()
      })
    }
  }

  resetAction() {
    if (this.defaultQuery) {
      const filters = this.defaultQuery.substring(1)
      const href = `${window.location.href}&${filters}`
      window.location.href = href
    } else {
      window.location.reload()
    }
  }

  submitAction() {
    window.location.reload()
  }
}
