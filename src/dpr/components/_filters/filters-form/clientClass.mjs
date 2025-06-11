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
    this.resetButton = document.getElementById(resetButtonId)
    this.selectedFiltersWrapper = document.getElementById(selectedFiltersId)
    this.selectedFiltersButtons = document.querySelectorAll(`.${removeSelectedButtonClass}`)

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

  initSelectedFiltersButtons() {
    if (this.selectedFiltersButtons) {
      this.selectedFiltersButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          const keys = JSON.parse(e.target.getAttribute('data-query-param-key'))
          const values = JSON.parse(e.target.getAttribute('data-query-param-value'))
          let constraints = e.target.getAttribute('data-query-constraint-values')
          constraints = constraints ? JSON.parse(e.target.getAttribute('data-query-constraint-values')) : undefined

          keys.forEach((key) => {
            values.forEach((value) => {
              this.updateQueryParam(key, value, 'delete')
            })
            if (constraints) {
              const constraint = constraints.find((con) => con.key === key)
              if (constraint) {
                this.updateQueryParam(key, constraint.value)
              }
            }
          })

          this.updateQueryParam('preventDefault', true)
          window.location.reload()
        })
      })
    }
  }
}
