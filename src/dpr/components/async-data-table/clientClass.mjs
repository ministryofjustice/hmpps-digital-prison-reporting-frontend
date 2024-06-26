import { DprClientClass } from '../../DprClientClass.mjs'

export default class AsyncDataTable extends DprClientClass {
  static getModuleName () {
    return 'async-data-table'
  }

  initialise () {
    this.table = document.getElementById('dpr-async-data-table')
    this.createTableHeaderAndFooter()
  }

  // eslint-disable-next-line class-methods-use-this
  createTableHeaderAndFooter () {
    if (this.table) {
      const classification = this.table.getAttribute('data-classification')
      const headLength = Number(this.table.getAttribute('data-head-length'))
      const rowLength = Number(this.table.getAttribute('data-row-length'))
      const pageSize = Number(this.table.getAttribute('data-page-size'))
      const selectedPage = Number(this.table.getAttribute('data-selected-page'))
      const totalRowCount = Number(this.table.getAttribute('data-total-results'))

      const classificationContent = `<b>${classification}</b>`
      const currentRangeStart = (selectedPage - 1) * pageSize
      const currentRangeEnd = currentRangeStart + rowLength
      const totalsContent =
        totalRowCount > 0 ? `${currentRangeStart + 1}-${currentRangeEnd} of ${totalRowCount}` : `0-0 of 0`

      // Headers
      const header = this.table.createTHead()

      const totalsHeaderRow = header.insertRow(0)
      const totalsHeaderCell = totalsHeaderRow.insertCell(0)
      totalsHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content table-row-count table-row-count--top table-row--no-border" colspan=${headLength}>${totalsContent}</th>`

      const classificationHeaderRow = header.insertRow(1)
      const classificationHeaderCell = classificationHeaderRow.insertCell(0)
      classificationHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content print-header-footer" colspan=${headLength}>${classificationContent}</th>`

      // Footers
      const footer = this.table.createTFoot()

      const classificationfooterRow = footer.insertRow(0)
      const classificationFooterCell = classificationfooterRow.insertCell(0)
      classificationFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`

      const totalsfooterRow = footer.insertRow(1)
      const totalsFooterCell = totalsfooterRow.insertCell(0)
      totalsFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content table-row-count table-row-count--bottom table-row--no-border" colspan=${headLength}>${totalsContent}</td>`
    }
  }
}
