/* eslint-disable class-methods-use-this */
/* global dayjs */

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
      this.resetQuickFilters()
    })
  }

  initQuickFilterChangeEvent() {
    this.quickFiltersInput.addEventListener('change', (e) => {
      console.log(`quickFiltersInput ${e.target.value} changed`)
      this.updateStartEndValues(e.target.value)
    })
  }

  initStartEndInputChangetEvent() {
    this.startInput.addEventListener('change', (e) => {
      this.startEndInputChangeEvent(e)
      this.resetQuickFilters()
    })
    this.endInput.addEventListener('change', (e) => {
      this.startEndInputChangeEvent(e)
      this.resetQuickFilters()
    })
  }

  startEndInputChangeEvent(e) {
    console.log(`${e.target.value} changed`)
  }

  setGranularityValue(value) {
    this.granularityInput.value = value
  }

  setStartValue(value) {
    this.startInput.value = value
  }

  setEndValue(value) {
    this.endInput.value = value
  }

  resetQuickFilters() {
    this.quickFiltersInput.value = 'none'
  }

  updateStartEndValues(quickFilterValue) {
    let startDate
    let endDate
    let granularity

    switch (quickFilterValue) {
      case 'today':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'day')
        granularity = 'daily'
        break
      case 'last-seven-days':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'week')
        granularity = 'daily'
        break
      case 'last-thirty-days':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'month')
        granularity = 'daily'
        break
      case 'last-month':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'month')
        granularity = 'monthly'
        break
      case 'last-full-month':
        endDate = dayjs().subtract(1, 'month').endOf('month')
        startDate = endDate.subtract(1, 'month')
        granularity = 'monthly'
        break
      case 'last-90-days':
        endDate = dayjs()
        startDate = endDate.subtract(3, 'month')
        granularity = 'daily'
        break
      case 'last-3-months':
        endDate = dayjs()
        startDate = endDate.subtract(3, 'month')
        granularity = 'monthly'
        break
      case 'last-full-3-months':
        endDate = dayjs().subtract(1, 'month').endOf('month')
        startDate = endDate.subtract(3, 'month')
        granularity = 'monthly'
        break
      case 'last-year':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'year')
        granularity = 'annually'
        break
      case 'last-full-year':
        endDate = dayjs().subtract(1, 'year').endOf('year')
        startDate = endDate.subtract(1, 'year')
        granularity = 'annually'
        break
      default:
        break
    }

    this.setStartValue(startDate.format('DD/MM/YYYY').toString())
    this.setEndValue(endDate.format('DD/MM/YYYY').toString())
    this.setGranularityValue(granularity)
  }
}
