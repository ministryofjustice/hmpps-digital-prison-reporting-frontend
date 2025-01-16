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
    const idPrefix = `filters.${this.fieldName}`

    this.quickFiltersInput = this.filter.querySelector(`select[name='${idPrefix}.quick-filter']`)
    this.granularityInput = this.filter.querySelector(`select[name='${idPrefix}.granularity']`)
    this.startInput = this.filter.querySelector(`input[name='${idPrefix}.start']`)
    this.endInput = this.filter.querySelector(`input[name='${idPrefix}.end']`)

    this.initStartEndInputChangetEvent()
    this.initGranularityChangeEvent()
    this.initQuickFilterChangeEvent()
  }

  initGranularityChangeEvent() {
    this.granularityInput.addEventListener('change', (e) => {
      this.resetQuickFilters()
    })
  }

  initQuickFilterChangeEvent() {
    this.quickFiltersInput.addEventListener('change', (e) => {
      this.updateStartEndValues(e.target.value)
    })
  }

  initStartEndInputChangetEvent() {
    this.startInput.addEventListener('change', (e) => {
      this.resetQuickFilters()
    })
    this.endInput.addEventListener('change', (e) => {
      this.resetQuickFilters()
    })
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
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(this.quickFiltersInput.id, 'none')
    window.history.replaceState(null, null, `?${queryParams.toString()}`)
  }

  updateStartEndValues(quickFilterValue) {
    let startDate
    let endDate
    let granularity

    switch (quickFilterValue) {
      case 'today':
        endDate = dayjs()
        startDate = dayjs()
        granularity = 'daily'
        break
      case 'yesterday':
        endDate = dayjs().subtract(1, 'day')
        startDate = dayjs().subtract(1, 'day')
        granularity = 'daily'
        break
      case 'last-seven-days':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'week').add(1, 'day')
        granularity = 'daily'
        break
      case 'last-thirty-days':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'month').add(1, 'day')
        granularity = 'daily'
        break
      case 'last-month':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'month').add(1, 'day')
        granularity = 'monthly'
        break
      case 'last-full-month':
        endDate = dayjs().subtract(1, 'month').endOf('month')
        startDate = endDate.startOf('month')
        granularity = 'monthly'
        break
      case 'last-ninety-days':
        endDate = dayjs()
        startDate = endDate.subtract(3, 'month').add(1, 'day')
        granularity = 'daily'
        break
      case 'last-three-months':
        endDate = dayjs()
        startDate = endDate.subtract(3, 'month').add(1, 'day')
        granularity = 'monthly'
        break
      case 'last-full-three-months':
        endDate = dayjs().subtract(1, 'month').endOf('month')
        startDate = endDate.subtract(2, 'month').startOf('month')
        granularity = 'monthly'
        break
      case 'last-year':
        endDate = dayjs()
        startDate = endDate.subtract(1, 'year').add(1, 'day')
        granularity = 'annually'
        break
      case 'last-full-year':
        endDate = dayjs().subtract(1, 'year').endOf('year')
        startDate = endDate.startOf('year')
        granularity = 'annually'
        break
      case 'tomorrow':
        endDate = dayjs().add(1, 'day')
        startDate = dayjs().add(1, 'day')
        granularity = 'daily'
        break
      case 'next-seven-days':
        startDate = dayjs()
        endDate = dayjs().add(7, 'day').subtract(1, 'day')
        granularity = 'daily'
        break
      case 'next-thirty-days':
        startDate = dayjs()
        endDate = dayjs().add(1, 'month').subtract(1, 'day')
        granularity = 'daily'
        break
      case 'next-month':
        startDate = dayjs()
        endDate = dayjs().add(1, 'month').subtract(1, 'day')
        granularity = 'monthly'
        break
      case 'next-full-month':
        startDate = dayjs().add(1, 'month').startOf('month')
        endDate = startDate.endOf('month')
        granularity = 'monthly'
        break
      case 'next-ninety-days':
        startDate = dayjs()
        endDate = dayjs().add(3, 'month').subtract(1, 'day')
        granularity = 'daily'
        break
      case 'next-three-months':
        startDate = dayjs()
        endDate = dayjs().add(3, 'month').subtract(1, 'day')
        granularity = 'monthly'
        break
      case 'next-full-three-months':
        startDate = dayjs().add(1, 'month').startOf('month')
        endDate = startDate.add(2, 'month').endOf('month')
        granularity = 'monthly'
        break
      case 'next-year':
        startDate = dayjs()
        endDate = dayjs().add(1, 'year').subtract(1, 'day')
        granularity = 'annually'
        break
      case 'next-full-year':
        startDate = dayjs().add(1, 'year').startOf('year')
        endDate = startDate.endOf('year')
        granularity = 'annually'
        break
      default:
        break
    }

    this.setStartValue(startDate.format('DD/MM/YYYY').toString())
    this.setEndValue(endDate.format('DD/MM/YYYY').toString())
    this.setGranularityValue(granularity)

    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(this.granularityInput.id, granularity)
    queryParams.set(this.startInput.id, startDate.format('YYYY/MM/DD').toString())
    queryParams.set(this.endInput.id, endDate.format('YYYY/MM/DD').toString())
    window.history.replaceState(null, null, `?${queryParams.toString()}`)
  }
}
