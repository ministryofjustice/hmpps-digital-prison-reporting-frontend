import DprQueryParamClass from '../../../DprQueryParamClass.mjs'

export default class Columns extends DprQueryParamClass {
  static getModuleName() {
    return 'columns'
  }

  initialise() {
    this.form = this.getElement()
    this.submitButton = this.getElement().querySelector('.dpr-apply-columns-button')
    this.resetButton = this.getElement().querySelector('.dpr-reset-columns-button')

    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.form.elements)
    this.initInputEvents(this.form.elements)

    this.initSubmitButton()
    this.initResetButton()
  }

  initSubmitButton() {
    this.submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.loadingHelper.showLoadingAnimation()
      window.location.reload()
    })
  }

  initResetButton() {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.loadingHelper.showLoadingAnimation()
      this.clearQueryParams('columns')
      window.location.reload()
    })
  }
}
