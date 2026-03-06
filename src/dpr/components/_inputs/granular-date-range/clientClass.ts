// @ts-nocheck
import dayjs, { Dayjs } from 'dayjs'

import { DprClientClass } from '../../../DprClientClass'

export class GranularDateRange extends DprClientClass {
  private quickFiltersInput: HTMLSelectElement
  private granularityInput: HTMLSelectElement
  private startInput: HTMLInputElement
  private endInput: HTMLInputElement

  private currentQuickFilterValue: string

  static override getModuleName() {
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

    this.currentStartInputValue = this.startInput.value
    this.currentEndInputValue = this.endInput.value
    this.currentQuickFilterValue = this.quickFiltersInput.value
    this.currentGranularityValue = this.granularityInput.value

    this.initChangeEvents()
  }

  initChangeEvents() {
    [this.granularityInput, this.quickFiltersInput, this.startInput, this.endInput].forEach((el) => {
      el.addEventListener('change', (event) => {
        this.resolveStateChange(event)
      })
    })
  }

  resolveStateChange(event: Event) {
    const target = (event.target as HTMLInputElement | HTMLSelectElement)
    const value = target.value

    switch (target.id) {
      case this.quickFiltersInput.id: {
        this.currentQuickFilterValue = value

        const { granularity, startDate, endDate } = this.calculateStartEndGranularity(value)
        this.granularityInput.value = granularity
        this.startInput.value = startDate.format('DD/MM/YYYY').toString()
        this.endInput.value = endDate.format('DD/MM/YYYY').toString()

        break
      }
      case this.granularityInput.id: {
        if (this.shouldResetQuickFilters(event)) {
          this.resetQuickFiltersToNone()
        }
        break
      }
      case this.startInput.id:
      case this.endInput.id: {
        this.resetQuickFiltersToNone()
        break
      }
      default: {
        dispatchEvent(event)
        break
      }
    }

    this.updateQueryParams()
  }

  resetQuickFiltersToNone() {
    this.quickFiltersInput.value = 'none'
  }

  updateQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set(this.granularityInput.id, this.granularityInput.value)
    queryParams.set(this.quickFiltersInput.id, this.quickFiltersInput.value)
    queryParams.set(this.startInput.id, this.startInput.value)
    queryParams.set(this.endInput.id, this.endInput.value)
    window.history.replaceState(null, '', `?${queryParams.toString()}`)
  }

  shouldResetQuickFilters(e: Event): boolean {
    const { value } = (e.target as HTMLInputElement | HTMLSelectElement)
    const invalidDailyValues = ['annually', 'monthly']
    const invalidMonthlyValues = ['annually']

    if (
      this.currentQuickFilterValue.includes('month') && invalidMonthlyValues.includes(value) ||
      this.currentQuickFilterValue.includes('day') && invalidDailyValues.includes(value)
    ) {
      return true
    }
    return false
  }

  calculateStartEndGranularity(quickFilterValue: string): {
    startDate: Dayjs
    endDate: Dayjs
    granularity: string
  } {
    let startDate = dayjs(this.startInput.value)
    let endDate = dayjs(this.endInput.value)
    let granularity = this.granularityInput.value

    switch (quickFilterValue) {
      // This case only happens if quick filter is _already_ none and someone changes granularity
      case 'none':
        endDate = dayjs()
        startDate = dayjs()
        granularity = this.granularityInput.value
        break
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

    return {
      startDate,
      endDate,
      granularity
    }
  }
}
