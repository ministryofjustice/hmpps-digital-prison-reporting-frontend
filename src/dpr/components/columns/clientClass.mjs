import { DprLoadingClientClass } from '../../DprLoadingClientClass.mjs'

export class Columns extends DprLoadingClientClass {

  static getModuleName() {
    return "card-group"
  }

  initialise() {
    const applyColumnsButton = this.getElement().querySelector('[data-apply-columns-to-querystring=true]')
    applyColumnsButton.addEventListener('click', (e) => {
      this.showLoadingAnimation()
      this.applyButtonClick(e)
    })

    const resetColumnsButton = this.getElement().querySelectorAll('[data-reset-columns=true]')
    resetColumnsButton.addEventListener('click', (e) => {
      this.showLoadingAnimation()
      this.resetButtonClick(e)
    })
  }

  applyButtonClick(e) {
    e.preventDefault()
    const columnsForm = document.getElementById('user-selected-columns-form')
    const columnsFormInputs = document.body.querySelectorAll(`#user-selected-columns-form input`)
    const colsRegExp = /columns=[^&]*/g
    const ampRexEx = /(&)\1+/g

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

    window.location.href = url
  }

  resetButtonClick(e) {
    e.preventDefault()
    const resetColsRegExp = /&?columns=[^&]*/g
    let url = decodeURI(window.location.href).replaceAll(resetColsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'

    window.location.href = url
  }
}
