/* eslint-disable class-methods-use-this */
import dayjs from 'dayjs'

import { DprClientClass } from '../../../DprClientClass.mjs'

export default class DateRangeInput extends DprClientClass {
  static getModuleName() {
    return 'date-range-input'
  }

  initialise() {
    this.dateRangeInputs = document.getElementById('dpr-date-range')
    this.filtersAccordion = document.getElementById('dpr-interactive-filters-details')
    this.fieldName = this.dateRangeInputs.getAttribute('data-field-name')

    this.startInputID = `filters.${this.fieldName}.start`
    this.endInputID = `filters.${this.fieldName}.end`
    this.durationInputID = `filters.${this.fieldName}.relative-duration`

    this.relativeRangeRadioButtons = document.querySelectorAll(`input[name='${this.durationInputID}']`)
    this.startInput = document.querySelector(`input[name='${this.startInputID}']`)
    this.endInput = document.querySelector(`input[name='${this.endInputID}']`)

    this.startRequired = this.startInput.required
    this.endRequired = this.endInput.required

    this.datePickerTab = document.getElementById(`tab_${this.fieldName}-date-picker`)
    this.relativeDurationTab = document.getElementById(`tab_${this.fieldName}-relative-range`)
    this.durationValue = undefined

    if (this.datePickerTab && this.relativeDurationTab) {
      this.initDatePickerTabClick()
      this.initRelativeDurationTabClick()
      this.initTabs()
      this.initDurationRadionButtonClick()
      this.initDatePickerUpdateEvents()
    }
  }

  initTabs() {
    this.queryParams = new URLSearchParams(window.location.search)
    if (this.queryParams.has(this.durationInputID)) {
      this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
        this.updateCheckedDuration(durationRadioButton)
      })
    }
  }

  initDatePickerTabClick() {
    this.datePickerTab.addEventListener('click', () => {
      let value
      this.queryParams = new URLSearchParams(window.location.search)
      if (this.queryParams.has(this.durationInputID)) {
        value = this.queryParams.get(this.durationInputID)
        this.removeSearchParam(this.durationInputID)
      }
      this.updateInputs(value)
    })
  }

  initRelativeDurationTabClick() {
    this.relativeDurationTab.addEventListener('click', () => {
      this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
        this.updateCheckedDuration(durationRadioButton)
      })
    })
  }

  initDurationRadionButtonClick() {
    this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
      durationRadioButton.addEventListener('click', (e) => {
        const durationValue = e.target.value
        this.durationValue = durationValue
        console.log(this.durationValue)
        this.updateInputs(durationValue)
        this.removeRequiredFromDatePickers()
      })
    })

    this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
      durationRadioButton.addEventListener('change', () => {
        if (Array.from(this.relativeRangeRadioButtons).every((input) => !input.checked)) {
          this.durationValue = null
          this.updateInputs(this.durationValue)
        }
      })
    })
  }

  removeSearchParam(name, name2) {
    this.queryParams = new URLSearchParams(window.location.search)
    this.queryParams.delete(name)
    if (name2) this.queryParams.delete(name2)

    window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
  }

  updateCheckedDuration(durationRadioButton) {
    if (durationRadioButton.checked) {
      const durationValue = durationRadioButton.value
      this.updateInputs(durationValue)
      const changeEvent = new Event('change')
      durationRadioButton.dispatchEvent(changeEvent)
    }
  }

  removeRequiredFromDatePickers() {
    this.startInput.removeAttribute('required')
    this.endInput.removeAttribute('required')
    this.startInput.value = ''
    this.endInput.value = ''
  }

  updateInputs(durationValue) {
    this.startInput.required = this.startRequired
    this.endInput.required = this.endRequired

    if (durationValue || this.durationValue) {
      const d = durationValue || this.durationValue
      const { startDate, endDate } = this.calculateDateForDatepicker(d)
      this.startInput.value = startDate
      this.endInput.value = endDate
    } else {
      this.startInput.value = null
      this.endInput.value = null
    }
    const changeEvent = new Event('change')
    this.startInput.dispatchEvent(changeEvent)
    this.endInput.dispatchEvent(changeEvent)
  }

  initDatePickerUpdateEvents() {
    this.startInput.addEventListener('change', () => {
      this.removeSearchParam(this.durationInputID)
    })
    this.endInput.addEventListener('change', () => {
      this.removeSearchParam(this.durationInputID)
    })
  }

  calculateDateForDatepicker(duration) {
    let startDate
    let endDate

    switch (duration) {
      case 'none':
        startDate = ''
        endDate = ''
        break
      case 'yesterday':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'day')
        break
      case 'tomorrow':
        startDate = dayjs()
        endDate = startDate.add(1, 'day')
        break
      case 'last-week':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'week')
        break
      case 'next-week':
        startDate = dayjs()
        endDate = startDate.add(1, 'week')
        break
      case 'last-month':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'month')
        break
      case 'next-month':
        startDate = dayjs()
        endDate = startDate.add(1, 'month')
        break
      default:
        startDate = ''
        endDate = ''
        break
    }

    return {
      startDate: startDate ? startDate.format('DD/MM/YYYY').toString() : '',
      endDate: endDate ? endDate.format('DD/MM/YYYY').toString() : '',
    }
  }
}
