/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class Search extends DprClientClass {
  static getModuleName() {
    return 'search'
  }

  initialise() {
    this.searchBox = this.getElement().querySelector('.dpr-search-box')
    this.shwoUnauthorisedCheckbox = this.getElement().querySelector('#show-unauthorised')

    if (this.searchBox) {
      this.initSeachBoxEvents()
    }

    if (this.shwoUnauthorisedCheckbox) {
      this.initShowUnauthorisedEvents()
    }

    this.initInputFromQueryParams()
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

  updateTableRows(searchValue) {
    const table = this.getElement().querySelector('table').querySelector('tbody')

    const rows = Array.from(table.rows)
    rows.forEach((row) => row.classList.add('search-option-hide'))

    this.updateSearchListing(rows, searchValue)
    this.toggleUnauthorisedRows(rows)
  }

  toggleUnauthorisedRows(rows) {
    const queryParams = new URLSearchParams(window.location.search)
    const value = queryParams.get('show-unauthorised')

    rows
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

  updateSearchListing(rows, value) {
    rows
      .filter((row) => {
        return (
          !value ||
          value.length === 0 ||
          Array.from(row.cells).find((cell) => {
            const searchValue = value.toLowerCase()
            return cell.innerText.toLowerCase().includes(searchValue.toLowerCase())
          })
        )
      })
      .forEach((row) => {
        row.classList.remove('search-option-hide')
      })
  }

  // eslint-disable-next-line
  initInputFromQueryParams () {
    const urlParams = new URLSearchParams(window.location.search)

    urlParams.forEach((value, key) => {
      const element = document.getElementById(key)

      if (element && element.classList.contains('dpr-search-box')) {
        element.value = value
        this.updateTableRows(element.value)
      }

      if (element && element.id === 'show-unauthorised') {
        element.setAttribute('checked', '')
      }
    })
  }
}
