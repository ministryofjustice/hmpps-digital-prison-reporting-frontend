import { DprClientClass } from '../../baseClientClass.mjs'

export class DataTable extends DprClientClass {

  static getModuleName() {
    return "data-table"
  }

  initialise() {
    this.getElement().querySelectorAll('[data-navigate-to]').forEach((select) => {
      select.addEventListener('change', (event) => {
        window.location.href = select.dataset.navigateTo.replace(/thisValue/, event.target.value)
        return false
      })
    })

    this.createTableHeaderAndFooter()
  }

  createTableHeaderAndFooter() {
    const table = document.getElementById('dpr-data-table')
    if (table) {
      const classification = table.getAttribute('data-classification')
      const headLength = Number(table.getAttribute('data-head-length'))

      const header = table.createTHead()
      const footer = table.createTFoot()

      const headerRow = header.insertRow(0)
      const footerRow = footer.insertRow(0)

      const headerCell = headerRow.insertCell(0)
      const footerCell = footerRow.insertCell(0)

      const classList = ['govuk-table__header', 'print-header-footer']
      const content = `<b>${classification}</b>`

      headerCell.colSpan = headLength
      headerCell.classList.add(...classList)
      headerCell.innerHTML = content

      footerCell.colSpan = headLength
      footerCell.classList.add(...classList)
      footerCell.innerHTML = content
    }
  }
}
