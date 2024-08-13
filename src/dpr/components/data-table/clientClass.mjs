import { DprClientClass } from '../../DprClientClass.mjs'

export default class DataTable extends DprClientClass {
  static getModuleName() {
    return 'data-table'
  }

  initialise() {
    this.table = document.getElementById('dpr-data-table')
    this.createTableHeaderAndFooter()
  }

  createTableHeaderAndFooter() {
    if (this.table) {
      const classification = this.table.getAttribute('data-classification')
      const headLength = Number(this.table.getAttribute('data-col-length'))
      const classificationContent = `<b>${classification}</b>`

      // Headers
      const header = this.table.createTHead()

      const classificationHeaderRow = header.insertRow(1)
      const classificationHeaderCell = classificationHeaderRow.insertCell(0)
      classificationHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content print-header-footer" colspan=${headLength}>${classificationContent}</th>`

      // Footers
      const footer = this.table.createTFoot()

      const classificationFooterRow = footer.insertRow(0)
      const classificationFooterCell = classificationFooterRow.insertCell(0)
      classificationFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`
    }
  }
}
