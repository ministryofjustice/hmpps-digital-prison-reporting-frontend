import { DprClientClass } from '../../DprClientClass.mjs'

export default class Daterange extends DprClientClass {
  static getModuleName() {
    return 'date-range'
  }

  initialise() {
    this.startInputs = document.querySelectorAll(`input.daterange-start-input`)
    this.endInputs = document.querySelectorAll(`input.daterange-end-input`)
    this.setToValueTriggers = document.querySelectorAll(`[data-set-min-max-trigger='true']`)
    this.setMinMaxValue()
    this.setToValue()
  }

  setMinMaxValue() {
    this.startInputs.forEach((startInput) => {
      this.setMinMaxEventListener(startInput)
    })
    this.endInputs.forEach((endInput) => {
      this.setMinMaxEventListener(endInput)
    })
  }

  setMinMaxEventListener(element) {
    const min = element.getAttribute('min')
    const max = element.getAttribute('max')

    element.addEventListener('blur', () => {
      if (element.value) {
        const startDate = new Date(element.value)

        if (min) {
          const minDate = new Date(min)
          if (startDate < minDate) {
            // eslint-disable-next-line
            element.value = minDate.toISOString().split('T')[0]
          }
        }
        if (max) {
          const maxDate = new Date(max)
          if (startDate > maxDate) {
            // eslint-disable-next-line
            element.value = maxDate.toISOString().split('T')[0]
          }
        }
      }
    })
  }

  setToValue() {
    this.setToValueTriggers.forEach((set) => {
      set.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-set-min-max-value')
        const inputId = e.target.getAttribute('data-set-to-input')
        document.getElementById(inputId).value = value
      })
    })
  }
}
