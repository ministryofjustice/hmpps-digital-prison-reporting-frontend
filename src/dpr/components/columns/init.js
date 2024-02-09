const applyColumnsButton = document.body.querySelector('[data-apply-columns-to-querystring=true]')
if (applyColumnsButton) {
  applyColumnsButton.addEventListener('click', (e) => {
    e.preventDefault()
    const columnsForm = document.getElementById('user-selected-columns-form')
    const columnsFormInputs = document.body.querySelectorAll(`#user-selected-columns-form input`)
    const colsRegExp = /columns=[^&]*/g
    const ampRexEx = /([&])\1+/g

    columnsFormInputs.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.disabled = false
    })

    const formData = new FormData(columnsForm)
    let serializedFormData = ''
    formData.forEach((n, v) => {
      serializedFormData += `&${v.replace('.columns', '')}=${n}`
    })

    columnsFormInputs.forEach((input) => {
      // eslint-disable-next-line no-param-reassign
      input.disabled = true
    })

    let url = decodeURI(window.location.href).replaceAll(colsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'
    url += serializedFormData
    url = url.replaceAll('?&', '?').replaceAll(ampRexEx, '&')

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  })
}

const resetColumnsButton = document.body.querySelector('[data-reset-columns=true]')
if (resetColumnsButton) {
  resetColumnsButton.addEventListener('click', (e) => {
    e.preventDefault()
    const resetColsRegExp = /&?columns=[^&]*/g
    let url = decodeURI(window.location.href).replaceAll(resetColsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'

    const loadingPanels = document.getElementsByClassName('loading-panel')
    Array.from(loadingPanels).forEach((l) => {
      l.classList.add('show')
    })

    window.location.href = url
  })
}
