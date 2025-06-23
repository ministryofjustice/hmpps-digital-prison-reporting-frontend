/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import DprCatalogueFilters from '../catalogue-filters/clientClass.mjs'

export default class DprCatalogueUnauthorisedFilter extends DprCatalogueFilters {
  static getModuleName() {
    return 'dpr-catalogue-show-unauthorised'
  }

  initialise() {
    this.toggleFilters = this.getElement().querySelector('#dpr-toggle-filters')
    this.shwoUnauthorisedCheckbox = this.getElement().querySelector('#show-unauthorised')

    if (this.toggleFilters) {
      this.tableId = this.toggleFilters.dataset.tableId
      this.initTable()

      if (this.shwoUnauthorisedCheckbox) {
        this.initShowUnauthorisedEvents()
        this.initUnauthorisedInputFromQueryParams()
      }
    }
  }

  updateTableRows() {
    this.updateUnauthorisedRows()
    this.updateTotals()
  }

  initShowUnauthorisedEvents() {
    this.shwoUnauthorisedCheckbox.addEventListener('change', (e) => {
      const queryParams = new URLSearchParams(window.location.search)
      if (e.target.checked) {
        queryParams.set(e.target.id, e.target.value)
      } else {
        queryParams.delete(e.target.id, e.target.value)
      }
      window.history.replaceState(null, null, `?${queryParams.toString()}`)

      this.updateTableRows()
    })

    this.updateTableRows()
  }

  updateUnauthorisedRows() {
    const queryParams = new URLSearchParams(window.location.search)
    const value = queryParams.get('show-unauthorised')
    const hideClassName = 'dpr-unauthorised-report-hide'
    Array.from(this.table.rows)
      .filter((row) => {
        return Array.from(row.cells).find((cell) => {
          return cell.innerHTML.includes('dpr-unauthorised-report')
        })
      })
      .forEach((row) => {
        if (value) {
          row.classList.remove(hideClassName)
        } else if (!row.classList.contains(hideClassName)) {
          row.classList.add(hideClassName)
        }
      })
  }

  initUnauthorisedInputFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.forEach((value, key) => {
      const element = document.getElementById(key)
      if (element && element.id === 'show-unauthorised') {
        element.setAttribute('checked', '')
      }
    })
  }
}
