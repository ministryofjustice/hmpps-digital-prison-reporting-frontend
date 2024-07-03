import { DprClientClass } from '../../DprClientClass.mjs'

export default class DataTable extends DprClientClass {
  static getModuleName () {
    return 'data-table'
  }

  initialise () {
    this.getElement()
      .querySelectorAll('[data-navigate-to]')
      .forEach((select) => {
        select.addEventListener('change', (event) => {
          this.loadingHelper.showLoadingAnimation()
          window.location.href = select.dataset.navigateTo.replace(/thisValue/, event.target.value)
          return false
        })
      })

    this.getElement()
      .querySelectorAll('[data-navigate-to-page]')
      .forEach((select) => {
        select.addEventListener('click', () => {
          this.loadingHelper.showLoadingAnimation()
          return false
        })
      })

    this.getElement()
      .querySelectorAll('[data-column]')
      .forEach((select) => {
        select.addEventListener('click', () => {
          this.loadingHelper.showLoadingAnimation()
          return false
        })
      })

    this.createTableHeaderAndFooter()
  }

  // eslint-disable-next-line class-methods-use-this
  createTableHeaderAndFooter () {
    const table = document.getElementById('dpr-data-table')
    if (table) {
      const classification = table.getAttribute('data-classification')
      const headLength = Number(table.getAttribute('data-head-length'))
      const rowLength = Number(table.getAttribute('data-row-length'))
      const pageSize = Number(table.getAttribute('data-page-size'))
      const selectedPage = Number(table.getAttribute('data-selected-page'))
      const totalRowCount = Number(table.getAttribute('data-total-results'))

      const classificationContent = `<b>${classification}</b>`
      const currentRangeStart = (selectedPage - 1) * pageSize
      const currentRangeEnd = currentRangeStart + rowLength
      const totalsContent = `${currentRangeStart + 1}-${currentRangeEnd} of ${totalRowCount}`

      // Headers
      const header = table.createTHead()

      const totalsHeaderRow = header.insertRow(0)
      const totalsHeaderCell = totalsHeaderRow.insertCell(0)
      totalsHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content table-row-count table-row-count--top table-row--no-border" colspan=${headLength}>${totalsContent}</th>`

      const classificationHeaderRow = header.insertRow(1)
      const classificationHeaderCell = classificationHeaderRow.insertCell(0)
      classificationHeaderCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content print-header-footer" colspan=${headLength}>${classificationContent}</th>`

      // Footers
      const footer = table.createTFoot()

      const classificationfooterRow = footer.insertRow(0)
      const classificationFooterCell = classificationfooterRow.insertCell(0)
      classificationFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content print-header-footer table-row--no-border" colspan=${headLength}>${classificationContent}</td>`

      const totalsfooterRow = footer.insertRow(1)
      const totalsFooterCell = totalsfooterRow.insertCell(0)
      totalsFooterCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content table-row-count table-row-count--bottom table-row--no-border" colspan=${headLength}>${totalsContent}</td>`
    }
  }
}
