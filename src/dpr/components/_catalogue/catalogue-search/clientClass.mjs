/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../../DprClientClass.mjs'

export default class DprCatalogueSearch extends DprClientClass {
  static getModuleName() {
    return 'dpr-catalogue-search'
  }

  initialise() {
    this.searchBox = this.getElement().querySelector('.dpr-search-box')
    if (this.searchBox) {
      this.initSeachBoxEvents()
      this.initSearchInputFromQueryParams()
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

  updateSearchListing(value) {
    let shown = 0
    Array.from(this.table.rows)
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
        shown += 1
      })

    this.shownRows = shown
  }

  initSearchInputFromQueryParams() {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.forEach((value, key) => {
      const element = document.getElementById(key)
      if (element && element.classList.contains('dpr-search-box')) {
        element.value = value
        this.updateTableRows(element.value)
      }
    })
  }
}
