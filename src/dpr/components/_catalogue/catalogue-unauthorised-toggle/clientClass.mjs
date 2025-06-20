/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../../DprClientClass.mjs'

export default class DprCatalogueSearch extends DprClientClass {
  static getModuleName() {
    return 'dpr-catalogue-show-unauthorised'
  }

  initialise() {
    this.shwoUnauthorisedCheckbox = this.getElement().querySelector('#show-unauthorised')

    if (this.shwoUnauthorisedCheckbox) {
      this.initShowUnauthorisedEvents()
      this.initUnauthorisedInputFromQueryParams()
    }
  }

  initSeachBoxEvents() {
    this.searchBox.addEventListener('keyup', (e) => {
      this.updateTableRows(e.target.value)

      // Update Query Params
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set(this.searchBox.id, e.target.value)
      window.history.replaceState(null, null, `?${queryParams.toString()}`)
    })
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

      this.updateTableRows(this.searchBox.value)
    })

    this.updateTableRows(this.searchBox.value)
  }

  updateUnauthorisedRows() {
    const queryParams = new URLSearchParams(window.location.search)
    const value = queryParams.get('show-unauthorised')

    Array.from(this.table.rows)
      .filter((row) => {
        return Array.from(row.cells).find((cell) => {
          return cell.innerHTML.includes('dpr-unauthorised-report')
        })
      })
      .forEach((row) => {
        if (value) {
          row.classList.remove('search-option-hide')
        } else if (!row.classList.contains('search-option-hide')) row.classList.add('search-option-hide')
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
