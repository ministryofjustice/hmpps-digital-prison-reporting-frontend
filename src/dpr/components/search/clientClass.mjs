import { DprClientClass } from '../../DprClientClass.mjs'

export default class Search extends DprClientClass {
  static getModuleName() {
    return 'search'
  }

  updateSearchListing (value) {
    const table = this.getElement().querySelector('.dpr-search-table').querySelector('tbody')

    const rows = Array.from(table.rows)
    rows.forEach(row => row.classList.add('search-option-hide'))

    const searchValue = value.toLowerCase()

    rows
      .filter(row => !value ||
        value.length === 0 ||
        Array.from(row.cells).find(cell => cell.innerText.toLowerCase().includes(searchValue.toLowerCase()))
      )
      .forEach(row => {
        Array.from(row.cells).forEach(cell => {
          cell.innerHTML = cell.innerHTML
              .replace(/<\/?b>/gi, '')

            if (searchValue) {
              const text = cell.innerText.replaceAll(new RegExp(`(${searchValue})`, 'gi'), `<b>$1</b>`)
              cell.innerHTML = cell.innerHTML.replace(cell.innerText, text)
            }
          }
        )
        row.classList.remove('search-option-hide')
      })
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
