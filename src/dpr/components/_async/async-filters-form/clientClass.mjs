import DprFiltersFormClass from '../../_filters/filters-form/clientClass.mjs'

export default class AsyncFilters extends DprFiltersFormClass {
  static getModuleName() {
    return 'async-filters'
  }

  initialise() {
    this.initFiltersForm({
      formId: 'async-filters-form',
      submitButtonId: 'async-request-report-button',
      resetButtonId: 'async-request-reset-filters-button',
    })
  }

  initFormData() {
    const { origin, pathname, search } = window.location
    document.getElementById('async-filters-form-pathname').value = pathname
    document.getElementById('async-filters-form-origin').value = origin
    document.getElementById('async-filters-form-search').value = search

    const params = new URLSearchParams(search)
    const paramsString = params.size > 0 ? `?${params.toString()}` : ''
    document.getElementById('async-filters-form-href').value = `${origin}${pathname}${paramsString}`
    this.initFormValidation(this.formFields)
    this.mainForm.classList.remove('async-filters-form--hidden')
  }

  submitAction() {
    this.mainForm.requestSubmit()
  }
}
