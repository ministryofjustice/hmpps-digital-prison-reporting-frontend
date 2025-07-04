/* eslint-disable class-methods-use-this */
import dayjs from 'dayjs'

import { DprClientClass } from '../../../DprClientClass.mjs'

export default class GranularDateRangeInput extends DprClientClass {
  static getModuleName() {
    return 'granular-date-range-input'
  }

  initialise() {
    this.filter = this.getElement()
    this.fieldName = this.filter.getAttribute('data-field-name')
    this.idPrefix = `filters.${this.fieldName}`

    this.quickFiltersInput = this.filter.querySelector(`select[name='${this.idPrefix}.quick-filter']`)
    this.granularityInput = this.filter.querySelector(`select[name='${this.idPrefix}.granularity']`)
    this.startInput = this.filter.querySelector(`input[name='${this.idPrefix}.start']`)
    this.endInput = this.filter.querySelector(`input[name='${this.idPrefix}.end']`)
    this.currentQuickFilterValue = this.quickFiltersInput.value

    this.initStartEndInputChangetEvent()
    this.initGranularityChangeEvent()
    this.initQuickFilterChangeEvent()
  }

  initGranularityChangeEvent() {
    this.granularityInput.addEventListener('change', (e) => {
      const { value } = e.target
      const invalidDailyValues = ['annually', 'monthly']
      const invalidMonthlyValues = ['annually']

      if (this.currentQuickFilterValue.includes('month') && invalidMonthlyValues.includes(value)) {
        this.resetQuickFilters()
      }

      if (this.currentQuickFilterValue.includes('day') && invalidDailyValues.includes(value)) {
        this.resetQuickFilters()
      }
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
    const changeEvent = new Event('change')
    this.granularityInput.dispatchEvent(changeEvent)
  }

  setStartValue(value) {
    this.startInput.value = value
    const changeEvent = new Event('change')
    this.startInput.dispatchEvent(changeEvent)
  }

  setEndValue(value) {
    this.endInput.value = value
    const changeEvent = new Event('change')
    this.endInput.dispatchEvent(changeEvent)
  }

  resetQuickFilters() {
    const quickFilterState = this.filter.querySelector(`select[name='${this.idPrefix}.quick-filter']`)
    if (this.currentQuickFilterValue === quickFilterState.value) {
      this.quickFiltersInput.value = 'none'
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set(this.quickFiltersInput.id, 'none')
      window.history.replaceState(null, null, `?${queryParams.toString()}`)

      const changeEvent = new Event('change')
      quickFilterState.dispatchEvent(changeEvent)
    }
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
        startDate = endDate.subtract(7, 'day').add(1, 'day')
        granularity = 'daily'
        break
      case 'last-thirty-days':
        endDate = dayjs()
        startDate = endDate.subtract(30, 'day').add(1, 'day')
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
        startDate = endDate.subtract(90, 'day').add(1, 'day')
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
      case 'last-six-months':
        endDate = dayjs()
        startDate = endDate.subtract(6, 'month').add(1, 'day')
        granularity = 'monthly'
        break
      case 'last-full-six-months':
        endDate = dayjs().subtract(1, 'month').endOf('month')
        startDate = endDate.subtract(6, 'month').startOf('month')
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
        endDate = dayjs().add(30, 'day').subtract(1, 'day')
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
        endDate = dayjs().add(90, 'day').subtract(1, 'day')
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

    this.currentQuickFilterValue = quickFilterValue
  }
}
