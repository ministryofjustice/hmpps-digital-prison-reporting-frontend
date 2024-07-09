import { DprClientClass } from '../../DprClientClass.mjs'

export default class DataTable extends DprClientClass {
  static getModuleName () {
    return 'data-table'
  }

  initialise () {
    this.table = document.getElementById('dpr-data-table')
    this.createTableHeaderAndFooter()
  }

  getTotalSummary() {
    const rowLength = Number(this.table.getAttribute('data-row-length'))
    const pageSize = Number(this.table.getAttribute('data-page-size'))
    const selectedPage = Number(this.table.getAttribute('data-selected-page'))
    const totalRowCount = Number(this.table.getAttribute('data-total-results'))

    const currentRangeStart = (selectedPage - 1) * pageSize
    const currentRangeEnd = currentRangeStart + rowLength

    if (currentRangeStart === 0 && totalRowCount === currentRangeEnd) {
      return totalRowCount === 1 ? `${totalRowCount} total result` : `${totalRowCount} total results`
    }

    return totalRowCount > 0 ? `${currentRangeStart + 1}-${currentRangeEnd} of ${totalRowCount}` : `0-0 of 0`
  }

  createTableHeaderAndFooter () {
    if (this.table) {
      const classification = this.table.getAttribute('data-classification')
      const headLength = Number(this.table.getAttribute('data-col-length'))
      const totalsContent = this.getTotalSummary()
      const classificationContent = `<b>${classification}</b>`

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

      const classificationFooterRow = footer.insertRow(0)
      const classificationFooterCell = classificationFooterRow.insertCell(0)
      classificationFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`

      const totalsFooterRow = footer.insertRow(1)
      const totalsFooterCell = totalsFooterRow.insertCell(0)
      totalsFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content table-row-count table-row-count--bottom table-row--no-border" colspan=${headLength}>${totalsContent}</td>`
    }
  }
}
