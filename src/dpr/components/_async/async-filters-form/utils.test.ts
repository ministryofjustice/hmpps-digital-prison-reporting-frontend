import MockDate from 'mockdate'
import MockDefinitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import MockRenderFiltersData from '../../../../../test-app/mocks/mockAsyncData/mockRenderFiltersData'

import * as AsyncFiltersUtils from './utils'
import * as ReportSummaryHelper from '../../../utils/reportStoreHelper'

import type { components } from '../../../types/api'
import type { RenderFiltersReturnValue } from './types'

describe('AsyncFiltersUtils', () => {
  let mockDefintionVariants: components['schemas']['VariantDefinition'][]
  let mockReport: components['schemas']['SingleVariantReportDefinition']

  beforeEach(() => {
    jest.spyOn(ReportSummaryHelper, 'getDuplicateRequestIds').mockReturnValue([])

    mockDefintionVariants = MockDefinitions.report.variants.filter(
      (v) => v.id === 'variantId-17',
    ) as components['schemas']['VariantDefinition'][]

    mockReport = {
      id: 'mockReport',
      name: 'name',
      description: 'descriptionFromReport',
      variant: mockDefintionVariants[0],
    }
  })

  describe('renderFilters', () => {
    it('should get the render data for the filters page', async () => {
      const filterRenderData = <RenderFiltersReturnValue>(
        await AsyncFiltersUtils.default.renderFilters(mockReport.variant.specification.fields)
      )
      expect(filterRenderData.filters).toEqual(MockRenderFiltersData.filters)
      expect(filterRenderData.sortBy).toEqual(MockRenderFiltersData.sortBy)
    })
  })

  describe('setDurationStartAndEnd', () => {
    const params = {
      name: 'DurationFieldName.relative-duration',
      fields: [
        {
          name: 'DurationFieldName',
          display: 'Duration Field name',
        },
      ] as unknown as components['schemas']['FieldDefinition'][],
    }

    beforeEach(() => {
      MockDate.set('2024-06-06')
    })

    afterEach(() => {
      MockDate.reset()
    })

    it('should set the start and end date using a relative duration - Next week', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'next-week', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Next week (2024-06-06 - 2024-06-13)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'next-week' },
        query: {
          'filters.DurationFieldName.end': '2024-06-13',
          'filters.DurationFieldName.start': '2024-06-06',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should set the start and end date using a relative duration - Last week', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'last-week', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Last week (2024-05-30 - 2024-06-06)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'last-week' },
        query: {
          'filters.DurationFieldName.end': '2024-06-06',
          'filters.DurationFieldName.start': '2024-05-30',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should set the start and end date using a relative duration - last month', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'last-month', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Last month (2024-05-06 - 2024-06-06)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'last-month' },
        query: {
          'filters.DurationFieldName.end': '2024-06-06',
          'filters.DurationFieldName.start': '2024-05-06',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should set the start and end date using a relative duration - Next month', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'next-month', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Next month (2024-06-06 - 2024-07-06)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'next-month' },
        query: {
          'filters.DurationFieldName.end': '2024-07-06',
          'filters.DurationFieldName.start': '2024-06-06',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should set the start and end date using a relative duration - yesterday', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'yesterday', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Yesterday (2024-06-05 - 2024-06-06)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'yesterday' },
        query: {
          'filters.DurationFieldName.end': '2024-06-06',
          'filters.DurationFieldName.start': '2024-06-05',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should set the start and end date using a relative duration - tomorrow', () => {
      const result = AsyncFiltersUtils.setDurationStartAndEnd(params.name, 'tomorrow', {}, {}, [], params.fields)

      const expectedResult = {
        querySummary: [
          {
            name: 'Duration Field name',
            value: 'Tomorrow (2024-06-06 - 2024-06-07)',
          },
        ],
        filterData: { 'DurationFieldName.relative-duration': 'tomorrow' },
        query: {
          'filters.DurationFieldName.end': '2024-06-07',
          'filters.DurationFieldName.start': '2024-06-06',
        },
      }

      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSortByFromDefinition', () => {
    it('should return an empty array when no options are set', async () => {
      const res = await AsyncFiltersUtils.getSortByFromDefinition([])

      expect(res).toEqual([])
    })
  })
})
