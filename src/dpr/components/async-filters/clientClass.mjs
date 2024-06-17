import DprQueryParamClass from '../../DprQueryParamClass.mjs'

export default class AsyncFilters extends DprQueryParamClass {
  static getModuleName () {
    return 'async-filters'
  }

  initialise () {
    this.mainForm = document.getElementById('async-filters-form')
    this.submitButton = document.getElementById('async-request-report-button')
    this.resetButton = document.getElementById('async-request-reset-filters-button')

    this.initInputsFromQueryParams()

    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)

    this.initResetButton()

    document.getElementById('async-filters-form-pathname').value = window.location.pathname
    document.getElementById('async-filters-form-origin').value = window.location.origin
  }

  initResetButton () {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.clearQueryParams()
      window.location.reload()
    })
  }
}
