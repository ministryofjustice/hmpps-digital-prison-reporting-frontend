import DprLoadingClientClass from '../../DprLoadingClientClass.mjs'

export default class DataTable extends DprLoadingClientClass {
  static getModuleName() {
    return 'data-table'
  }

  initialise() {
    this.getElement()
      .querySelectorAll('[data-navigate-to]')
      .forEach((select) => {
        select.addEventListener('change', (event) => {
          this.showLoadingAnimation()
          window.location.href = select.dataset.navigateTo.replace(/thisValue/, event.target.value)
          return false
        })
      })

    this.getElement()
      .querySelectorAll('[data-navigate-to-page]')
      .forEach((select) => {
        select.addEventListener('click', () => {
          this.showLoadingAnimation()
          return false
        })
      })

    this.getElement()
      .querySelectorAll('[data-column]')
      .forEach((select) => {
        select.addEventListener('click', () => {
          this.showLoadingAnimation()
          return false
        })
      })

    this.createTableHeaderAndFooter()
  }

  // eslint-disable-next-line class-methods-use-this
  createTableHeaderAndFooter() {
    const table = document.getElementById('dpr-data-table')
    if (table) {
      const classification = table.getAttribute('data-classification')
      const headLength = Number(table.getAttribute('data-head-length'))

      const header = table.createTHead()
      const footer = table.createTFoot()

      const rowClassList = ['govuk-table__row', 'print-header-footer']
      const footerRow = footer.insertRow(0)
      const headerRow = header.insertRow(0)
      headerRow.classList.add(...rowClassList)
      footerRow.classList.add(...rowClassList)

      const headerCell = headerRow.insertCell(0)
      const footerCell = footerRow.insertCell(0)

      const content = `<b>${classification}</b>`

      headerCell.colSpan = headLength
      headerCell.outerHTML = `<th class="govuk-table__header govuk-table__cell--content" colspan=${headLength}>${content}</th>`

      footerCell.colSpan = headLength
      footerCell.outerHTML = `<td class="govuk-table__cell govuk-table__cell--content" colspan=${headLength}>${content}</td>`
    }
  }
}
