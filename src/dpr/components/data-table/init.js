$('[data-navigate-to]').each((index, element) => {
  const jElement = $(element)
  jElement.on('change', () => {
    window.location.href = jElement.attr('data-navigate-to').replace(/thisValue/, jElement.val())
    return false
  })
})

function showNoResultsMessage() {
  const table = document.getElementById('dpr-data-table')
  const noResultsMessage = document.getElementById('data-table-empty-message')
  if (table) {
    const rowLength = table.getAttribute('data-row-length')
    if (+rowLength === 0) {
      const tableContainer = document.getElementById('table-container')
      noResultsMessage.classList.add('show')
      tableContainer.classList.add('hide')
    }
  }
}

function createTableHeaderAndFooter() {
  const table = document.getElementById('dpr-data-table')
  if (table) {
    const classification = table.getAttribute('data-classification')
    const headLength = table.getAttribute('data-head-length')

    const header = table.createTHead()
    const footer = table.createTFoot()

    const headerRow = header.insertRow(0)
    const footerRow = footer.insertRow(0)

    const headerCell = headerRow.insertCell(0)
    const footerCell = footerRow.insertCell(0)

    const classList = 'govuk-table__header print-header-footer'
    const content = `<b>${classification}</b>`

    headerCell.colSpan = headLength
    headerCell.classList = classList
    headerCell.innerHTML = content

    footerCell.colSpan = headLength
    footerCell.classList = classList
    footerCell.innerHTML = content
  }
}

createTableHeaderAndFooter()
showNoResultsMessage()
