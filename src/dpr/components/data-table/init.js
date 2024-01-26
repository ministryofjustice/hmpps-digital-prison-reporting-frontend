$('[data-navigate-to]').each((index, element) => {
  const jElement = $(element)
  jElement.on('change', () => {
    window.location.href = jElement.attr('data-navigate-to').replace(/thisValue/, jElement.val())
    return false
  })
})

function createTableHeaderAndFooter() {
  const table = document.getElementById('dpr-data-table')
  const { classification, length } = table.dataset

  const header = table.createTHead()
  const footer = table.createTFoot()

  const headerRow = header.insertRow(0)
  const footerRow = footer.insertRow(0)

  const headerCell = headerRow.insertCell(0)
  const footerCell = footerRow.insertCell(0)

  const classList = 'govuk-table__header print-header-footer'
  const content = `<b>${classification}</b>`

  headerCell.colSpan = length
  headerCell.classList = classList
  headerCell.innerHTML = content

  footerCell.colSpan = length
  footerCell.classList = classList
  footerCell.innerHTML = content
}

createTableHeaderAndFooter()
