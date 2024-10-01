import { DprClientClass } from '../../DprClientClass.mjs'

export default class DateInput extends DprClientClass {
  static getModuleName() {
    return 'date-input'
  }

  initialise() {
    const element = this.getElement()
    this.dateInputWrapper = element.querySelectorAll(`.moj-datepicker`)
    this.dateInput = element.querySelectorAll(`input.moj-js-datepicker-input`)
    this.setToValueTriggers = document.querySelectorAll(`[data-set-min-max-trigger='true']`)

    this.setMinMaxEventListener()
    this.setToValue()
  }

  setMinMaxEventListener() {
    const min = this.dateInputWrapper.getAttribute('data-min-date')
    const max = this.dateInputWrapper.getAttribute('data-max-date')

    this.dateInput.addEventListener('blur', () => {
      if (this.dateInput.value) {
        const dateValue = new Date(this.dateInput.value)

        if (min) {
          const minDate = new Date(min)
          if (dateValue < minDate) {
            this.dateInput.value = min
          }
        }

        if (max) {
          const maxDate = new Date(max)
          if (dateValue > maxDate) {
            this.dateInput.value = max
          }
        }
      }

      const changeEvent = new Event('change')
      this.dateInput.dispatchEvent(changeEvent)
    })
  }

  setToValue() {
    this.setToValueTriggers.forEach((set) => {
      set.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-set-min-max-value')
        const inputId = e.target.getAttribute('data-set-to-input')
        const input = document.getElementById(inputId)

        input.value = value
        const changeEvent = new Event('change')
        input.dispatchEvent(changeEvent)
      })
    })
  }
}
