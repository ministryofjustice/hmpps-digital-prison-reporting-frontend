/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import DprCatalogueFilters from '../catalogue-filters/clientClass'

class DprCatalogueTypeFilter extends DprCatalogueFilters {
  static getModuleName() {
    return 'dpr-catalogue-type-filter'
  }

  initialise() {
    this.reportTypeFilter = this.getElement().querySelector('#dpr-report-type-filters')
    if (this.reportTypeFilter) {
      this.tableId = this.reportTypeFilter.dataset.tableId
      this.initTable()
      this.initRadioButtonEvent()
      this.updateTableRows()
    }
  }

  initRadioButtonEvent() {
    this.reportTypeFilter.addEventListener('change', (e) => {
      const queryParams = new URLSearchParams(window.location.search)
      if (e.target.checked) {
        queryParams.set(e.target.name, e.target.value)
      } else {
        queryParams.delete(e.target.name, e.target.value)
      }
      window.history.replaceState(null, null, `?${queryParams.toString()}`)
      this.updateTableRows()
    })
  }

  updateTableRows() {
    const query = new URLSearchParams(window.location.search)
    this.updateReportTypeRowsRows(query)
    this.updateTotals()
  }

  updateReportTypeRowsRows(queryParams) {
    const value = queryParams.get('report-type')
    const hideClassName = `dpr-report-type-hide`
    const tag = `dpr-type__${value}`
    this.updateRows(value, hideClassName, tag)
  }

  updateRows(value, hideClassName, tag) {
    Array.from(this.table.rows).forEach((row) => {
      row.classList.remove(hideClassName)
    })

    Array.from(this.table.rows)
      .filter((row) => {
        const isTypeRow = []
        Array.from(row.cells).forEach((cell) => {
          return isTypeRow.push(cell.innerHTML.includes(tag))
        })
        return isTypeRow.every((t) => t === false)
      })
      .forEach((row) => {
        if (value && value !== 'all') {
          row.classList.add(hideClassName)
        }
      })
  }
}

export { DprCatalogueTypeFilter }
export default DprCatalogueTypeFilter
