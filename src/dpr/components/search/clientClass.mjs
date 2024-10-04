/* eslint-disable no-param-reassign */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class Search extends DprClientClass {
  static getModuleName() {
    return 'search'
  }

  updateSearchListing(value) {
    const table = this.getElement().querySelector('table').querySelector('tbody')

    const rows = Array.from(table.rows)
    rows.forEach((row) => row.classList.add('search-option-hide'))

    const searchValue = value.toLowerCase()

    rows
      .filter((row) => {
        return (
          !value ||
          value.length === 0 ||
          Array.from(row.cells).find((cell) => {
            return cell.innerText.toLowerCase().includes(searchValue.toLowerCase())
          })
        )
      })
      .forEach((row) => {
        // NOTE: Text highlighting functionality below breaks the client class JS. Causing bookmarking & showmore to break

        // Array.from(row.cells).forEach((cell) => {
        //   const innerHTMLContent = cell.innerHTML
        //   cell.innerHTML = innerHTMLContent.replace(/<\/?b>/gi, '')

        //   if (searchValue) {
        //     const innerHTMLText = cell.innerText
        //     const text = innerHTMLText.replaceAll(new RegExp(`(${searchValue})`, 'gi'), `<b>$1</b>`)
        //     const innerHTMLCont = cell.innerHTML
        //     cell.innerHTML = innerHTMLCont.replace(cell.innerText, text)
        //   }
        // })
        row.classList.remove('search-option-hide')
      })
  }

  initialise() {
    const searchBox = this.getElement().querySelector('.dpr-search-box')

    if (searchBox) {
      searchBox.addEventListener('keyup', (e) => {
        this.updateSearchListing(e.target.value)

        // Update Query Params
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set(searchBox.id, e.target.value)
        window.history.replaceState(null, null, `?${queryParams.toString()}`)
      })

      this.initInputFromQueryParams()
    }
  }

  // eslint-disable-next-line
  initInputFromQueryParams () {
    const urlParams = new URLSearchParams(window.location.search)

    urlParams.forEach((value, key) => {
      const element = document.getElementById(key)
      if (element && element.classList.contains('dpr-search-box')) {
        element.value = value
        this.updateSearchListing(element.value)
      }
    })
  }
}
