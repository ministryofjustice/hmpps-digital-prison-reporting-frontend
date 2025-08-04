import MockDate from 'mockdate'
import { Request } from 'express'
import mockVariant from '../../../../../test-app/mocks/mockClients/reports/mockVariants/feature-testing/missingDescription'
import MockRenderFiltersData from '../../../../../test-app/mocks/mockAsyncData/mockRenderFiltersData'

import * as AsyncFiltersUtils from './utils'
import * as ReportSummaryHelper from '../../../utils/reportStoreHelper'

import type { components } from '../../../types/api'
import type { RenderFiltersReturnValue } from './types'

describe('AsyncFiltersUtils', () => {
  let mockReport: components['schemas']['SingleVariantReportDefinition']

  beforeEach(() => {
    jest.spyOn(ReportSummaryHelper, 'getDuplicateRequestIds').mockReturnValue([])

    mockReport = {
      id: 'mockReport',
      name: 'name',
      description: 'descriptionFromReport',
      variant: mockVariant as components['schemas']['VariantDefinition'],
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
      name: 'filters.DurationFieldName.relative-duration',
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
        filterData: {
          'filters.DurationFieldName.relative-duration': 'next-week',
        },
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
        filterData: { 'filters.DurationFieldName.relative-duration': 'last-week' },
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
        filterData: {
          'filters.DurationFieldName.relative-duration': 'last-month',
        },
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
        filterData: {
          'filters.DurationFieldName.relative-duration': 'next-month',
        },
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
        filterData: {
          'filters.DurationFieldName.relative-duration': 'yesterday',
        },
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
        filterData: {
          'filters.DurationFieldName.relative-duration': 'tomorrow',
        },
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

  describe('setQueryFromFilters', () => {
    const params = {
      fields: [
        {
          name: 'field1',
          display: 'Field 1 Display',
          filter: {
            type: 'autocomplete',
            mandatory: false,
            staticOptions: [
              {
                name: 'Fez',
                display: 'Fezzick',
              },
            ],
          },
        },
        {
          name: 'field2',
          display: 'Field 2 Display',
          filter: {
            type: 'autocomplete',
            mandatory: false,
            staticOptions: [
              {
                name: 'PrHum',
                display: 'Prince Humperdink',
              },
            ],
          },
        },
        {
          name: 'field3',
          display: 'Field 3 Display',
          filter: {
            type: 'daterange',
            mandatory: false,
          },
        },
        {
          name: 'field4',
          display: 'Field 4 Display',
          filter: {
            type: 'radio',
            mandatory: false,
          },
        },
      ] as unknown as components['schemas']['FieldDefinition'][],
    }

    it('should set the query to the value the query parameters of the request have if they exist and overwrite the form data values', () => {
      const mockReqBody = {
        dataProductDefinitionsPath: '',
        _csrf: 'csrfToken',
        type: 'report',
        search: '?filters.field1=Fez&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04',
        'filters.field1': 'Fezzick',
        'filters.field2': 'Prince Humperdink',
        'filters.field3.start': '01-02-2003',
        'filters.field3.end': '04-05-2006',
        sortColumn: 'field1',
        sortedAsc: 'true',
      }
      const mockReq = { body: mockReqBody } as unknown as Request
      const result = AsyncFiltersUtils.default.setQueryFromFilters(mockReq, params.fields)

      const expectedResult = {
        filterData: {
          field1: 'Fez',
          field2: 'Prince Humperdink',
          'field3.end': '2006-05-04',
          'field3.start': '2003-02-01',
        },
        query: {
          'filters.field1': 'Fez',
          'filters.field2': 'Prince Humperdink',
          'filters.field3.end': '2006-05-04',
          'filters.field3.start': '2003-02-01',
          sortColumn: 'field1',
          sortedAsc: 'true',
        },
        querySummary: [
          {
            name: 'Field 1 Display',
            value: 'Fez',
          },
          {
            name: 'Field 2 Display',
            value: 'Prince Humperdink',
          },
          {
            name: 'Field 3 Display start',
            value: '01/02/2003',
          },
          {
            name: 'Field 3 Display end',
            value: '04/05/2006',
          },
          {
            name: 'Sort Column',
            value: 'Field 1 Display',
          },
          {
            name: 'Sort Direction',
            value: 'Ascending',
          },
        ],
        sortData: {
          sortColumn: 'field1',
          sortedAsc: 'true',
        },
      }

      expect(result).toEqual(expectedResult)
    })

    it('should remove `no-filter` from the querydata', () => {
      const mockReqBody = {
        dataProductDefinitionsPath: '',
        _csrf: 'csrfToken',
        type: 'report',
        search:
          '?filters.field1=Fez&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field4=no-filter',
        'filters.field1': 'Fezzick',
        'filters.field2': 'Prince Humperdink',
        'filters.field3.start': '01-02-2003',
        'filters.field3.end': '04-05-2006',
        'filters.field4': 'no-filter',
        sortColumn: 'field1',
        sortedAsc: 'true',
      }
      const mockReq = { body: mockReqBody } as unknown as Request
      const result = AsyncFiltersUtils.default.setQueryFromFilters(mockReq, params.fields)

      const expectedResult = {
        filterData: {
          field1: 'Fez',
          field2: 'Prince Humperdink',
          'field3.end': '2006-05-04',
          'field3.start': '2003-02-01',
        },
        query: {
          'filters.field1': 'Fez',
          'filters.field2': 'Prince Humperdink',
          'filters.field3.end': '2006-05-04',
          'filters.field3.start': '2003-02-01',
          sortColumn: 'field1',
          sortedAsc: 'true',
        },
        querySummary: [
          {
            name: 'Field 1 Display',
            value: 'Fez',
          },
          {
            name: 'Field 2 Display',
            value: 'Prince Humperdink',
          },
          {
            name: 'Field 3 Display start',
            value: '01/02/2003',
          },
          {
            name: 'Field 3 Display end',
            value: '04/05/2006',
          },
          {
            name: 'Sort Column',
            value: 'Field 1 Display',
          },
          {
            name: 'Sort Direction',
            value: 'Ascending',
          },
        ],
        sortData: {
          sortColumn: 'field1',
          sortedAsc: 'true',
        },
      }

      expect(result).toEqual(expectedResult)
    })
  })
})
