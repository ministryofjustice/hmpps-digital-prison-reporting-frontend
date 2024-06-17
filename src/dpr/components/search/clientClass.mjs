import { DprClientClass } from '../../DprClientClass.mjs'

export default class Search extends DprClientClass {
  static getModuleName() {
    return 'search'
  }

  highlightText (text, searchValue) {
    return text.replaceAll(new RegExp(`(${searchValue})`, 'gi'), '<b>$1</b>')
  }

  addAndHighlightColumn = (row, content, searchValue, id, path) => {
    const column = document.createElement('td')
    if (id) {
      column.innerHTML = `<a href="./${path}/${id}/">` + this.highlightText(content, searchValue) + '</a>'
    } else {
      column.innerHTML = this.highlightText(content, searchValue)
    }
    column.classList.add('govuk-table__cell')
    row.appendChild(column)
  }

  updateSearchListing (value) {
    const table = this.getElement().querySelector('.dpr-search-table').querySelector('tbody')

    while (table.rows.length > 0) {
      table.deleteRow(0)
    }

    const searchValue = value.toLowerCase()

    document.definitions
      .filter(d => !value ||
        value.length === 0 ||
        d.name.toLowerCase().includes(searchValue) ||
        d.author.toLowerCase().includes(searchValue) ||
        d.tags.find(tag => tag.toLowerCase().includes(searchValue)) ||
        Object.values(d.keywords).find(keyword => keyword.toLowerCase().includes(searchValue))
      )
      .sort((a, b) => {
        if (a.product === b.product) {
          return a.name > b.name ? 1 : -1
        } else {
          return a.product > b.product ? 1 : -1
        }
      })
      .map(report => {
        const row = document.createElement('tr')

        row.classList.add('govuk-table__row')

        this.addAndHighlightColumn(row, report.product, searchValue)
        this.addAndHighlightColumn(row, report.name, searchValue, report.id, report.path)

        return row
      })
      .forEach(row => table.appendChild(row))
  }

  initialise() {
    const searchBox = this.getElement().querySelector('.dpr-search-box')

    if (searchBox) {
      searchBox.addEventListener('keyup', e => {
        this.updateSearchListing(e.target.value)
      })

      this.updateSearchListing('')
    }
  }
}
