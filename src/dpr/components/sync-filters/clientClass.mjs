import DprFormValidationClass from '../../DprFormValidationClass.mjs'

export default class SyncFilters extends DprFormValidationClass {
  static getModuleName() {
    return 'sync-filters'
  }

  initialise() {
    this.errorMessages = []
    this.mainForm = document.getElementById('sync-filters-form')
    this.mainForm.noValidate = true
    this.formFields = Array.from(this.mainForm.elements)

    this.errorSummary = document.getElementById('query-error-summary')
    this.submitButton = document.getElementById('sync-apply-filters-button')
    this.resetButton = document.getElementById('sync-reset-filters-button')
    this.selectedFiltersButtons = document.querySelectorAll('.accordion-summary-remove-button')

    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)
    this.initSelectedFiltersButtons()

    this.initResetButton()
    this.initSubmitButton()
    this.initFormData()
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
        window.location.reload()
      }
    })
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
