import MockDate from 'mockdate'
import { components } from '../../../types/api'
import { FilterValue } from '../../_filters/types'
import GranularDatePickerUtils from './utils'

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
        defaultValue: 'today',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - last-seven-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-seven-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - last-thirty-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-thirty-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-05-07',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'last-thirty-days',
          display: 'Last 30 days',
        },
      })
    })

    it('should get the filter from the definition and set the value - last-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-month',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - last-full-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-full-month',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - last-90-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-90-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-07',
        end: '2024-06-06',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'last-90-days',
          display: 'Last 90 days',
        },
      })
    })

    it('should get the filter from the definition and set the value - last-3-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-3-months',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-07',
        end: '2024-06-06',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-3-months',
          display: 'Last 3 months',
        },
      })
    })

    it('should get the filter from the definition and set the value - last-full-3-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-full-3-months',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-03-01',
        end: '2024-05-31',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'last-full-3-months',
          display: 'Last full 3 months',
        },
      })
    })

    it('should get the filter from the definition and set the value - last-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-year',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - last-full-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'last-full-year',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - tomorrow', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'tomorrow',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-seven-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-seven-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-thirty-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-thirty-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-month',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-full-month', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-full-month',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-90-days', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-90-days',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-09-05',
        granularity: {
          value: 'daily',
          display: 'Daily',
        },
        quickFilter: {
          value: 'next-90-days',
          display: 'Next 90 days',
        },
      })
    })

    it('should get the filter from the definition and set the value - next-3-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-3-months',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-06-06',
        end: '2024-09-05',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-3-months',
          display: 'Next 3 months',
        },
      })
    })

    it('should get the filter from the definition and set the value - next-full-3-months', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-full-3-months',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

      const result = GranularDatePickerUtils.getFilterFromDefinition(filter, {} as unknown as FilterValue)

      expect(result.value).toEqual({
        start: '2024-07-01',
        end: '2024-09-30',
        granularity: {
          value: 'monthly',
          display: 'Monthly',
        },
        quickFilter: {
          value: 'next-full-3-months',
          display: 'Next full 3 months',
        },
      })
    })

    it('should get the filter from the definition and set the value - next-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-year',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })

    it('should get the filter from the definition and set the value - next-full-year', () => {
      const filter = {
        type: 'granulardaterange',
        defaultValue: 'next-full-year',
      } as unknown as components['schemas']['FilterDefinition'] & { defaultGranularity: string }

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
      })
    })
  })
})
