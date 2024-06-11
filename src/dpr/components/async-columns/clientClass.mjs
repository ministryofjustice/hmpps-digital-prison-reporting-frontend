import DprQueryParamClass from '../../DprQueryParamClass.mjs'

export default class Columns extends DprQueryParamClass {
  static getModuleName () {
    return 'async-columns'
  }

  initialise () {
    this.form = document.getElementById('async-columns-form')
    this.submitButton = document.getElementById('async-apply-columns-button')
    this.resetButton = document.getElementById('async-reset-columns-button')

    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.form.elements)
    this.initInputEvents(this.form.elements)

    this.initSubmitButton()
    this.initResetButton()
  }

  initSubmitButton () {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.reload()
    })
  }

  initResetButton () {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.clearQueryParams('columns')
      window.location.reload()
    })
  }
}
