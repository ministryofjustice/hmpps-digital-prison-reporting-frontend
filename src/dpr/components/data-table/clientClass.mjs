import { DprClientClass } from '../../DprClientClass.mjs'

export default class DataTable extends DprClientClass {
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
      let headerIds = ''
      const headers = this.table.querySelectorAll('th')
      headers.forEach((h) => {
        headerIds += `${h.getAttribute('id')} `
      })

      const classification = this.table.getAttribute('data-classification')
      const headLength = Number(this.table.getAttribute('data-col-length'))
      const classificationContent = `<b>${classification}</b>`

      // Headers
      const header = this.table.createTHead()

      const classificationHeaderRow = header.insertRow(1)
      const classificationHeaderCell = classificationHeaderRow.insertCell(0)
      classificationHeaderCell.outerHTML = `<th scope="rowgroup" id="table-classification-row-id" headers="ht_classification" class="govuk-table__header govuk-table__cell--content print-header-footer" colspan=${headLength}>${classificationContent}</th>`

      // Footers
      const footer = this.table.createTFoot()

      const classificationFooterRow = footer.insertRow(0)
      const classificationFooterCell = classificationFooterRow.insertCell(0)
      classificationFooterCell.outerHTML = `<td id="table-classification_footer" headers="${headerIds} table-classification-row-id" class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`
    }
  }
}
