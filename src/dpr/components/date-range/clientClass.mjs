/* global dayjs */

import { DprClientClass } from '../../DprClientClass.mjs'

export default class DateRangeInput extends DprClientClass {
  static getModuleName() {
    return 'date-range-input'
  }

  initialise() {
    this.dateRangeInputs = document.getElementById('dpr-date-range')
    this.fieldName = this.dateRangeInputs.getAttribute('data-field-name')

    this.startInputID = `filters.${this.fieldName}.start`
    this.endInputID = `filters.${this.fieldName}.end`

    this.durationInputID = `${this.fieldName}.relative-duration`

    this.relativeRangeRadioButtons = document.querySelectorAll(`input[name='${this.durationInputID}']`)
    this.startInput = document.querySelector(`input[name='${this.startInputID}']`)
    this.endInput = document.querySelector(`input[name='${this.endInputID}']`)
    this.startRequired = this.startInput.required
    this.endRequired = this.endInput.required

    this.datePickerTab = document.getElementById('tab_date-picker')
    this.relativeDurationTab = document.getElementById('tab_relative-range')

    if (this.datePickerTab && this.relativeDurationTab) {
      this.initDatePickerTabClick()
      this.initRelativeDurationTabClick()
      this.initTabs()
      this.initDurationRadionButtonClick()
    }
  }

  initTabs() {
    let hashFragment = 'date-picker'
    this.queryParams = new URLSearchParams(window.location.search)
    if (this.queryParams.has(this.startInputID) || this.queryParams.has(this.endInput)) {
      if (this.queryParams.has(this.durationInputID)) {
        this.removeSearchParam(this.durationInputID)
      }
    } else if (this.queryParams.has(this.durationInputID)) {
      hashFragment = 'relative-range'
      this.removeRequiredFromDatePickers()
    }
    window.location.hash = hashFragment
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
      window.location.hash = 'date-picker'
    })
  }

  initRelativeDurationTabClick() {
    this.relativeDurationTab.addEventListener('click', () => {
      this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
        this.updateCheckedDuration(durationRadioButton)
      })
      window.location.hash = 'relative-range'
    })
  }

  initDurationRadionButtonClick() {
    this.relativeRangeRadioButtons.forEach((durationRadioButton) => {
      durationRadioButton.addEventListener('click', () => {
        this.removeSearchParam(this.startInputID, this.endInputID)
        this.removeRequiredFromDatePickers()
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
      this.removeSearchParam(this.startInputID, this.endInputID)
      this.removeRequiredFromDatePickers()

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

    if (durationValue) {
      const { startDate, endDate } = this.calculateDateForDatepicker(durationValue)
      this.startInput.value = startDate
      this.endInput.value = endDate
    }
    const changeEvent = new Event('change')
    this.startInput.dispatchEvent(changeEvent)
    this.endInput.dispatchEvent(changeEvent)
  }

  calculateDateForDatepicker(duration) {
    let startDate
    let endDate

    switch (duration) {
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
        break
    }

    return {
      startDate: startDate.format('DD/MM/YYYY').toString(),
      endDate: endDate.format('DD/MM/YYYY').toString(),
    }
  }
}
