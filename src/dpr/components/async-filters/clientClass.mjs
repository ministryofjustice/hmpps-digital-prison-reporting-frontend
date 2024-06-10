import DprQueryParamClass from '../../DprQueryParamClass.mjs'

export default class AsyncFilters extends DprQueryParamClass {
  static getModuleName () {
    return 'async-filters'
  }

  initialise () {
    this.filtersForm = document.getElementById('async-filters-form-filters')
    this.sortedByForm = document.getElementById('async-filters-form-sortby')
    this.submitButton = document.getElementById('async-request-report-button')
    this.resetButton = document.getElementById('async-request-reset-filters-button')

    this.initInputsFromQueryParams()

    this.initQueryParamsFromInputs(this.filtersForm.elements)
    this.initInputEvents(this.filtersForm.elements)

    this.initQueryParamsFromInputs(this.sortedByForm.elements)
    this.initInputEvents(this.sortedByForm.elements)

    this.initSubmitEvent()
    this.initResetButton()
  }

  /**
   * Initialises the input event listeners
   *
   * @memberof AsyncFilters
   */
  async initSubmitEvent () {
    const endpoint = this.submitButton.getAttribute('data-endpoint')
    const reportId = this.submitButton.getAttribute('data-report-id')
    const variantId = this.submitButton.getAttribute('data-variant-id')
    const variantName = this.submitButton.getAttribute('data-variant-name')
    const reportName = this.submitButton.getAttribute('data-report-name')
    const variantDescription = this.submitButton.getAttribute('data-variant-description')

    this.submitButton.addEventListener('click', async () => {
      const sortData = this.getFormDataAsObject(this.sortedByForm, '')
      const filterData = this.getFormDataAsObject(this.filtersForm, '')
      const filterDataForQuery = this.getFormDataAsObject(this.filtersForm, 'filters.')
      const mergedFilters = { ...filterData, ...sortData }
      const querySummary = Object.keys(mergedFilters).map((key) => {
        return {
          name: key,
          value: mergedFilters[key],
        }
      })
      const query = { ...filterDataForQuery, ...sortData }

      const { origin, href, pathname, search } = window.location

      const res = await fetch(endpoint, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId,
          variantId,
          variantName,
          reportName,
          variantDescription,
          sortData,
          filterData,
          query,
          querySummary,
          href,
          pathname,
          search,
          origin,
        }),
      })

      window.location.href = res.url
    })
  }

  initResetButton () {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.clearQueryParams()
      window.location.reload()
    })
  }
}
