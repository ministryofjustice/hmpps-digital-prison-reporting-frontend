// @ts-nocheck
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import DprCatalogueFilters from '../catalogue-filters/clientClass'

class DprCatalogueSearch extends DprCatalogueFilters {
  static getModuleName() {
    return 'dpr-catalogue-search'
  }

  initialise() {
    this.searchBox = this.getElement().querySelector('.dpr-search-box')
    this.hideClass = 'dpr-search-option-hide'

    if (this.searchBox) {
      this.tableId = this.searchBox.dataset.tableId
      this.initTable()
      this.initSeachBoxEvents()
      this.updateTableRows()
      this.initSearchInputFromQueryParams()
      this.initProductCollectionSelect()
    }
  }

  initProductCollectionSelect() {
    /**
     * @type {HTMLSelectElement | undefined}
     */
    const productCollections = this.getElement().querySelector('#productCollection')
    if (productCollections) {
      productCollections.addEventListener('change', (e) => {
        e.preventDefault()
        productCollections.closest('form').submit()
      })
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

  updateTableRows(value) {
    this.initSearchRows(value)
    this.updateSearchListing(value)
    this.updateTotals()
  }

  initSearchRows(value) {
    const rows = Array.from(this.table.rows)
    if (value) {
      rows.forEach((row) => row.classList.add(this.hideClass))
    }
  }

  updateSearchListing(value) {
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
        row.classList.remove(this.hideClass)
      })
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

export { DprCatalogueSearch }
export default DprCatalogueSearch