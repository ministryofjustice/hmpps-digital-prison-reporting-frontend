import { expect } from '@jest/globals'
import MockDate from 'mockdate'
import { components } from '../../../types/api'
import { FilterValue } from '../../_filters/types'
import GranularDatePickerUtils from './utils'
import { Granularity, QuickFilters } from './types'

describe('GranularDatePickerUtils', () => {
  beforeEach(() => {
    MockDate.set('2024-06-06')
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('GranularDatePickerUtils', () => {
    it('should get the filter from the definition and set the value - today', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'today',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'today',
          display: 'Today',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-seven-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-seven-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-05-31',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'last-seven-days',
          display: 'Last 7 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-thirty-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-thirty-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-05-08',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'last-thirty-days',
          display: 'Last 30 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-month',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-05-07',
        end: '2024-06-06',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-month',
          display: 'Last month',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-full-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-full-month',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-05-01',
        end: '2024-05-31',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-full-month',
          display: 'Last full month',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-ninety-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-ninety-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-09',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'last-ninety-days',
          display: 'Last 90 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-three-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-three-months',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-07',
        end: '2024-06-06',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-three-months',
          display: 'Last 3 months',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-full-three-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-full-three-months',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-01',
        end: '2024-05-31',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-full-three-months',
          display: 'Last full 3 months',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-year',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2023-06-07',
        end: '2024-06-06',
        granularity: {
          value: 'annually',
          display: 'Annually',
        },
        quickFilter: {
          value: 'last-year',
          display: 'Last year',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - last-full-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'last-full-year',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2023-01-01',
        end: '2023-12-31',
        granularity: {
          value: 'annually',
          display: 'Annually',
        },
        quickFilter: {
          value: 'last-full-year',
          display: 'Last full year',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - tomorrow', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'tomorrow',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-07',
        end: '2024-06-07',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'tomorrow',
          display: 'Tomorrow',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-seven-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-seven-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-06-12',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'next-seven-days',
          display: 'Next 7 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-thirty-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-thirty-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-07-05',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'next-thirty-days',
          display: 'Next 30 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-month',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-07-05',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-month',
          display: 'Next month',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-full-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-full-month',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-07-01',
        end: '2024-07-31',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-full-month',
          display: 'Next full month',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-ninety-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-ninety-days',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-09-03',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'next-ninety-days',
          display: 'Next 90 days',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-three-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-three-months',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-09-05',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-three-months',
          display: 'Next 3 months',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-full-three-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-full-three-months',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-07-01',
        end: '2024-09-30',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-full-three-months',
          display: 'Next full 3 months',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-year',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2025-06-05',
        granularity: {
          value: 'annually',
          display: 'Annually',
        },
        quickFilter: {
          value: 'next-year',
          display: 'Next year',
        },
        partialDate: {
          end: true,
          start: true,
        },
      })
    })

    it('should get the filter from the definition and set the value - next-full-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultQuickFilterValue: 'next-full-year',
      } as unknown as components['schemas']['FilterDefinition'] & {
        defaultGranularity: Granularity
        defaultQuickFilterValue: QuickFilters
      }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2025-01-01',
        end: '2025-12-31',
        granularity: {
          value: 'annually',
          display: 'Annually',
        },
        quickFilter: {
          value: 'next-full-year',
          display: 'Next full year',
        },
        partialDate: {
          end: false,
          start: false,
        },
      })
    })
  })
})
