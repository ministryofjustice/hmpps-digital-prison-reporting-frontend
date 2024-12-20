/* eslint-disable class-methods-use-this */

import { DprClientClass } from '../../../DprClientClass.mjs'

export default class GranularDateRangeInput extends DprClientClass {
  static getModuleName() {
    return 'granular-date-range-input'
  }

  initialise() {
    this.filter = this.getElement()

    this.fieldName = this.filter.getAttribute('data-field-name')

    this.quickFiltersInput = this.filter.querySelector('#dpr-granular-date-range_quick-filter-input')
    this.granularityInput = this.filter.querySelector('#dpr-granular-date-range_granularity-input')

    const idPrefix = `filters.${this.fieldName}`
    this.startInput = this.filter.querySelector(`input[name='${idPrefix}.start']`)
    this.endInput = this.filter.querySelector(`input[name='${idPrefix}.end']`)

    this.initStartEndInputChangetEvent()
    this.initGranularityChangeEvent()
    this.initQuickFilterChangeEvent()
  }

  initGranularityChangeEvent() {
    this.granularityInput.addEventListener('change', (e) => {
      console.log(`granularity ${e.target.value} changed`)
    })
  }

  initQuickFilterChangeEvent() {
    this.quickFiltersInput.addEventListener('change', (e) => {
      console.log(`quickFiltersInput ${e.target.value} changed`)
    })
  }

  initStartEndInputChangetEvent() {
    this.startInput.addEventListener('change', this.startEndInputChangeEvent)
    this.endInput.addEventListener('change', this.startEndInputChangeEvent)
  }

  startEndInputChangeEvent(e) {
    console.log(`${e.target.value} changed`)
  }
}
