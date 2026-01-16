/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../../DprClientClass.mjs'

class DprCatalogueFilters extends DprClientClass {
  initTable() {
    this.table = document.getElementById(this.tableId).querySelector('tbody')
    this.classes = [
      'dpr-search-option-hide',
      'dpr-unauthorised-report-hide',
      'dpr-live-report-hide',
      'dpr-missing-report-hide',
      'dpr-report-type-hide',
    ]
    this.totalShown = document.getElementById('total-shown')
    this.totalAmount = document.getElementById('total-amount')
    this.totalRows = Array.from(this.table.rows).length
    this.shownRows = this.totalRows
  }

  updateTotals() {
    let count = 0
    this.table = document.getElementById(this.tableId).querySelector('tbody')
    Array.from(this.table.rows).forEach((row) => {
      const hidden = []
      this.classes.forEach((className) => {
        hidden.push(Array.from(row.classList).includes(className))
      })
      if (hidden.every((h) => h === false)) {
        count += 1
      }
    })
    this.shownRows = count
    this.renderTotals()
  }

  renderTotals() {
    if (this.totalShown) {
      this.totalShown.innerText = this.shownRows
    }
    if (this.totalAmount) {
      this.totalAmount.innerText = this.totalRows
    }
  }
}

export { DprCatalogueFilters }
export default DprCatalogueFilters
