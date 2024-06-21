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
    this.initFormData()
  }

  initFormData () {
    const { origin, pathname, search } = window.location
    document.getElementById('async-filters-form-pathname').value = pathname
    document.getElementById('async-filters-form-origin').value = origin
    document.getElementById('async-filters-form-search').value = search

    const params = new URLSearchParams(search)
    params.delete('retryId')
    const href = `${origin}${pathname}?${params.toString()}`

    document.getElementById('async-filters-form-href').value = href
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
