const applyFiltersButton = document.body.querySelector('[data-apply-form-to-querystring=true]')
if (applyFiltersButton) {
  applyFiltersButton.addEventListener('click', (e) => {
    e.preventDefault()
    const filtersForm = document.getElementById('user-selected-filters-form')
    const filtersRegExp = /filters[.\w]+=[^&]*/g
    const pagingRegExp = /paging\.selectedPage=\d+/
    const ampRexExp = /([&])\1+/g

    let url = decodeURI(window.location.href)
      .replaceAll(filtersRegExp, '')
      .replace(pagingRegExp, 'paging.selectedPage=1')
    url += url.indexOf('?') === -1 ? '?' : '&'

    const formData = new FormData(filtersForm)
    let serializedFormData = ''
    formData.forEach((n, v) => {
      serializedFormData += `&${v}=${n}`
    })

    url += serializedFormData
    url = url.replaceAll('?&', '?').replaceAll(ampRexExp, '&')

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  })
}

const resetFiltersButton = document.body.querySelector('[data-reset-filters=true]')
if (resetFiltersButton) {
  resetFiltersButton.addEventListener('click', (e) => {
    e.preventDefault()
    const resetColsRegExp = /&?columns=[^&]*/g
    const columnsQuery = window.location.href.match(resetColsRegExp)
    const baseUrl = e.target.getAttribute('data-apply-base-url')
    let url = baseUrl
    if (columnsQuery) url += columnsQuery.join('')

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  })
}

const removeFilterButtons = document.getElementsByClassName('accordion-summary-remove-button')
if (removeFilterButtons) {
  Array.from(removeFilterButtons).forEach((removeFilterButton) => {
    removeFilterButton.addEventListener('click', () => {
      const loadingPanels = document.getElementsByClassName('loading-panel')
      Array.from(loadingPanels).forEach((l) => {
        l.classList.add('show')
      })
    })
  })
}
