import DprQueryParamClass from '../../DprQueryParamClass.mjs'

export default class AsyncFilters extends DprQueryParamClass {
  static getModuleName() {
    return 'async-filters'
  }

  initialise() {
    this.mainForm = document.getElementById('async-filters-form')
    this.submitButton = document.getElementById('async-request-report-button')
    this.resetButton = document.getElementById('async-request-reset-filters-button')

    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)

    this.initResetButton()
    this.initSubmitButton()
    this.initFormData()
  }

  initFormData() {
    const { origin, pathname, search } = window.location
    document.getElementById('async-filters-form-pathname').value = pathname
    document.getElementById('async-filters-form-origin').value = origin
    document.getElementById('async-filters-form-search').value = search

    const params = new URLSearchParams(search)
    document.getElementById('async-filters-form-href').value = `${origin}${pathname}?${params.toString()}`
  }

  initSubmitButton() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.initFormData()
      this.mainForm.requestSubmit()
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
}
