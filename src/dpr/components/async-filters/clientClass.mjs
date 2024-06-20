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
    this.initRetryInputFromQueryParams()

    document.getElementById('async-filters-form-pathname').value = window.location.pathname
    document.getElementById('async-filters-form-origin').value = window.location.origin
    document.getElementById('async-filters-form-href').value = window.location.href
    document.getElementById('async-filters-form-search').value = window.location.search
  }

  initResetButton () {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.clearQueryParams()
      window.location.reload()
    })
  }

  initRetryInputFromQueryParams () {
    this.queryParams = new URLSearchParams(window.location.search)
    const retryId = this.queryParams.get('retryId')
    if (retryId) {
      document.getElementById('async-filters-retry-id').value = retryId
    }
  }
}
