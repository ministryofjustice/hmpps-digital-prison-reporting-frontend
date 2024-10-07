/* global dayjs */

import { DprClientClass } from '../../DprClientClass.mjs'

export default class DateInput extends DprClientClass {
  static getModuleName() {
    return 'date-input'
  }

  initialise() {
    const element = this.getElement()
    this.dateInput = element.querySelector(`input.moj-js-datepicker-input`)
    this.setToValueTriggers = document.querySelectorAll(`[data-set-min-max-trigger='true']`)

    this.required = this.getElement().getAttribute('data-required')
    this.displayName = this.getElement().getAttribute('data-display-name')
    this.pattern = this.getElement().getAttribute('data-pattern')
    this.patternHint = this.getElement().getAttribute('data-pattern-hint')
    this.min = this.getElement().getAttribute('data-min')
    this.max = this.getElement().getAttribute('data-max')

    this.setValidationOnInputEl()
    this.setMinMaxEventListener()
    this.setToMinMax()
    this.setToValue()
  }

  setValidationOnInputEl() {
    this.dateInput.setAttribute('required', this.required)
    this.dateInput.setAttribute('min', this.min)
    this.dateInput.setAttribute('max', this.max)
    this.dateInput.setAttribute('display-name', this.displayName)
    this.dateInput.setAttribute('pattern', this.pattern)
    this.dateInput.setAttribute('pattern-hint', this.patternHint)
  }

  setMinMaxEventListener() {
    this.dateInput.addEventListener('blur', () => {
      this.setToMinMax()
    })
  }

  setToMinMax() {
    if (this.dateInput.value) {
      const dateValue = new Date(this.dateInput.value)

      if (this.min) {
        const minDate = new Date(this.min)
        if (dateValue < minDate) {
          this.dateInput.value = dayjs(this.min).format('DD/MM/YYYY')
        }
      }

      if (this.max) {
        const maxDate = new Date(this.max)
        if (dateValue > maxDate) {
          this.dateInput.value = dayjs(this.max).format('DD/MM/YYYY')
        }
      }
    }

    const changeEvent = new Event('change')
    this.dateInput.dispatchEvent(changeEvent)
  }

  setToValue() {
    this.setToValueTriggers.forEach((set) => {
      set.addEventListener('click', (e) => {
        e.preventDefault()
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
