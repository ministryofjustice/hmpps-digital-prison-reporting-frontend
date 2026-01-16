/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import DprCatalogueFilters from '../catalogue-filters/clientClass.mjs'

class DprCatalogueUnauthorisedFilter extends DprCatalogueFilters {
  static getModuleName() {
    return 'dpr-catalogue-show-unauthorised'
  }

  initialise() {
    this.toggleFilters = this.getElement().querySelector('#dpr-toggle-filters')
    this.hideClasses = ['dpr-unauthorised-report-hide', 'dpr-live-report-hide', 'dpr-missing-report-hide']

    if (this.toggleFilters) {
      this.tableId = this.toggleFilters.dataset.tableId
      this.initTable()
      this.initCheckboxToggleEvents()
      this.initCheckboxesFromQueryParams()
      this.updateTableRows()
    }
  }

  initCheckboxToggleEvents() {
    this.toggleFilters.addEventListener('change', (e) => {
      const queryParams = new URLSearchParams(window.location.search)
      if (e.target.checked) {
        queryParams.set(e.target.id, e.target.value)
      } else {
        queryParams.delete(e.target.id, e.target.value)
      }
      window.history.replaceState(null, null, `?${queryParams.toString()}`)
      this.updateTableRows()
    })
  }

  updateTableRows() {
    const query = new URLSearchParams(window.location.search)
    this.updateUnauthorisedRows(query)
    this.updateMissingRows(query)
    this.updateLiveRows(query)
    this.updateTotals()
  }

  updateUnauthorisedRows(queryParams) {
    const value = queryParams.get('show-unauthorised')
    const hideClassName = this.hideClasses[0]
    const tag = 'dpr-unauthorised-report'
    this.updateRows(value, hideClassName, tag)
  }

  updateLiveRows(queryParams) {
    const value = queryParams.get('hide-live')
    const hideClassName = this.hideClasses[1]
    const tag = 'dpr-live-report'
    this.updateRowsLive(value, hideClassName, tag)
  }

  updateMissingRows(queryParams) {
    const value = queryParams.get('show-missing')
    const hideClassName = this.hideClasses[2]
    const tag = 'dpr-missing-report'
    this.updateRows(value, hideClassName, tag)
  }

  updateRowsLive(value, hideClassName, tag) {
    Array.from(this.table.rows)
      .filter((row) => {
        return Array.from(row.cells).find((cell) => {
          return cell.innerHTML.includes(tag)
        })
      })
      .forEach((row) => {
        if (value) {
          row.classList.add(hideClassName)
        } else {
          row.classList.remove(hideClassName)
        }
      })
  }

  updateRows(value, hideClassName, tag) {
    Array.from(this.table.rows)
      .filter((row) => {
        return Array.from(row.cells).find((cell) => {
          return cell.innerHTML.includes(tag)
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

  initCheckboxesFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.forEach((value, key) => {
      const element = document.getElementById(key)
      if (element && element.id === 'show-unauthorised') {
        element.setAttribute('checked', '')
      }
      if (element && element.id === 'show-missing') {
        element.setAttribute('checked', '')
      }
      if (element && element.id === 'hide-live') {
        element.setAttribute('checked', '')
      }
    })
  }
}

export { DprCatalogueUnauthorisedFilter }
export default DprCatalogueUnauthorisedFilter
