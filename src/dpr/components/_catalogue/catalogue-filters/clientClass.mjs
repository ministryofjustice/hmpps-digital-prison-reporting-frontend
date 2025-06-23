/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../../DprClientClass.mjs'

export default class DprCatalogueFilters extends DprClientClass {
  initTable() {
    this.table = document.getElementById(this.tableId).querySelector('tbody')
    this.totalShown = document.getElementById('total-shown')
    this.totalAmount = document.getElementById('total-amount')
    this.totalRows = Array.from(this.table.rows).length
    this.shownRows = this.totalRows
    this.updateTotals()
  }

  updateTotals() {
    if (this.totalShown) {
      this.totalShown.innerText = this.shownRows
    }
    if (this.totalAmount) {
      this.totalAmount.innerText = this.totalRows
    }
  }
}
