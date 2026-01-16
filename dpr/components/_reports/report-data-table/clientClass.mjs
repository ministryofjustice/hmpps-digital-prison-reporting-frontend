import { DprClientClass } from '../../../DprClientClass.mjs'

class DataTable extends DprClientClass {
  static getModuleName() {
    return 'data-table'
  }

  initialise() {
    this.tableContainer = document.getElementById('dpr-table-wrapper')
    this.table = document.getElementById('dpr-data-table')
    this.overflowGradient = document.getElementById('dpr-overflow-gradient')
    this.createTableHeaderAndFooter()
    this.initTableScrollListener()
  }

  initTableScrollListener() {
    this.checkOffsetWidths()

    window.addEventListener('resize', () => {
      this.checkOffsetWidths()
    })

    this.tableContainer.addEventListener('scroll', (event) => {
      const endOfScroll = this.table.offsetWidth
      const currentScroll = event.target.offsetWidth + event.target.scrollLeft
      if (endOfScroll === currentScroll) {
        this.overflowGradient.style.display = 'none'
      } else {
        this.overflowGradient.style.display = 'block'
      }
    })
  }

  checkOffsetWidths() {
    if (this.tableContainer.offsetWidth >= this.table.offsetWidth) {
      this.overflowGradient.style.display = 'none'
    } else {
      this.overflowGradient.style.display = 'block'
    }
  }

  createTableHeaderAndFooter() {
    if (this.table) {
      const classification = this.table.getAttribute('data-classification')
      const headLength = Number(this.table.getAttribute('data-col-length'))
      const classificationContent = `<b>${classification}</b>`

      // Headers
      const header = this.table.createTHead()

      const classificationHeaderRow = header.insertRow(0)
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

export { DataTable }
export default DataTable
