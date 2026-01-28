// @ts-nocheck
import DprQueryParamClass from '../../../../../DprQueryParamClass'

class Columns extends DprQueryParamClass {
  static getModuleName() {
    return 'columns'
  }

  initialise() {
    this.form = this.getElement()
    this.embbeddedReportList = document.getElementById('dpr-embedded-report-list')
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

      if (this.embbeddedReportList) {
        window.location.reload()
      } else {
        this.form.requestSubmit()
      }
    })
  }

  initResetButton() {
    this.resetButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.clearQueryParams('columns')
      window.location.reload()
    })
  }
}

export { Columns }
export default Columns
