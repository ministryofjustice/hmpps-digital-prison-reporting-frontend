import dayjs from 'dayjs'

import { DprClientClass } from '../../../DprClientClass'

class DateInput extends DprClientClass {
  dateInput: HTMLInputElement | null = null
  required: string | null = null
  displayName: string | null = null
  pattern: string | null = null
  patternHint: string | null = null
  min: string | null = null
  max: string | null = null
  setToValueTriggers: NodeListOf<Element> | null = null

  static override getModuleName() {
    return 'date-input'
  }

  override initialise() {
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
    if (this.required && this.required === 'true') {
      this.dateInput?.setAttribute('required', 'true')
    }
    if (this.min) this.dateInput?.setAttribute('min', this.min)
    if (this.max) this.dateInput?.setAttribute('max', this.max)

    this.displayName && this.dateInput?.setAttribute('display-name', this.displayName)
    this.pattern && this.dateInput?.setAttribute('pattern', this.pattern)
    this.patternHint && this.dateInput?.setAttribute('pattern-hint', this.patternHint)
  }

  setMinMaxEventListener() {
    this.dateInput?.addEventListener('blur', () => {
      this.setToMinMax()
    })
  }

  setToMinMax() {
    if (this.dateInput?.value) {
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
    this.dateInput?.dispatchEvent(changeEvent)
  }

  setToValue() {
    this.setToValueTriggers?.forEach(set => {
      set.addEventListener('click', e => {
        e.preventDefault()
        const value = (e.target as HTMLElement)?.getAttribute('data-set-min-max-value')
        const inputId = (e.target as HTMLElement)?.getAttribute('data-set-to-input') || ''
        const input: HTMLInputElement | null = document.getElementById(inputId) as HTMLInputElement | null

        if (input && value) {
          input.value = value
          const changeEvent = new Event('change')

          input?.dispatchEvent(changeEvent)
        }
      })
    })
  }
}

export { DateInput }
export default DateInput
