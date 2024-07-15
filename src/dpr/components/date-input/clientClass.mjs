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
    console.log(this.dateInput)
    this.dateInput.forEach((startInput) => {
      this.setMinMaxEventListener(startInput)
    })
  }

  setMinMaxEventListener (element) {
    const min = element.getAttribute('min')
    const max = element.getAttribute('max')

    element.addEventListener('blur', () => {
      console.log('value =', element.value)
      if (element.value) {
        const dateValue = new Date(element.value)

        if (min) {
          const minDate = new Date(min)
          console.log({ minDate, dateValue })

          if (dateValue < minDate) {
            console.log(dateValue < minDate)
            // eslint-disable-next-line
            element.value = minDate.toISOString().split('T')[0]
            console.log(element.value)
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
