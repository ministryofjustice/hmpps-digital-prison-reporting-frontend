import { DprClientClass } from '../../DprClientClass.mjs'

export default class DateInput extends DprClientClass {
  static getModuleName () {
    return 'date-input'
  }

  initialise () {
    this.dateInput = document.querySelectorAll(`input.dpr-date-input`)
    this.setToValueTriggers = document.querySelectorAll(`[data-set-min-max-trigger='true']`)
    this.setMinMaxValue()
    this.setToValue()
  }

  setMinMaxValue () {
    this.dateInput.forEach((startInput) => {
      this.setMinMaxEventListener(startInput)
    })
  }

  setMinMaxEventListener (element) {
    const min = element.getAttribute('min')
    const max = element.getAttribute('max')

    element.addEventListener('blur', () => {
      if (element.value) {
        const dateValue = new Date(element.value)

        if (min) {
          const minDate = new Date(min)

          if (dateValue < minDate) {
            // eslint-disable-next-line
            element.value = minDate.toISOString().split('T')[0]
          }
        }
        if (max) {
          const maxDate = new Date(max)
          if (dateValue > maxDate) {
            // eslint-disable-next-line
            element.value = maxDate.toISOString().split('T')[0]
          }
        }
      }
      const changeEvent = new Event('change')
      element.dispatchEvent(changeEvent)
    })
  }

  setToValue () {
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
