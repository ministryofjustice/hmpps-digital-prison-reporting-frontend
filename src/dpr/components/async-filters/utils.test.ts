import { Response, Request, NextFunction } from 'express'
import dayjs from 'dayjs'
import MockDate from 'mockdate'
import * as AsyncFiltersUtils from './utils'
import MockDefinitions from '../../../../test-app/mockAsyncData/mockReportDefinition'
import MockRenderFiltersData from '../../../../test-app/mockAsyncData/mockRenderFiltersData'
import * as ReportSummaryHelper from '../../utils/reportSummaryHelper'
import { Services } from '../../types/Services'
import { components } from '../../types/api'
import { RenderFiltersReturnValue } from './types'

describe('AsyncFiltersUtils', () => {
  let services: Services
  let req: Request
  let res: Response
  let next: NextFunction
  let mockDefintionVariants: components['schemas']['VariantDefinition'][]
  let mockReport: components['schemas']['SingleVariantReportDefinition']
  const updateStoreSpy = jest.spyOn(AsyncFiltersUtils, 'updateStore')

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

    services = {
      reportingService: {
        getDefinition: jest.fn().mockResolvedValue(mockReport),
        requestAsyncReport: jest.fn().mockResolvedValue({ executionId: 'executionId', tableId: 'tableId' }),
      },
      asyncReportsStore: {
        getAllReportsByVariantId: jest.fn().mockResolvedValue([]),
        addReport: jest.fn().mockResolvedValue({ url: { polling: { pathname: 'polling.pathname' } } }),
        setReportTimestamp: jest.fn(),
      },
      recentlyViewedStoreService: {
        getAllReportsByVariantId: jest.fn().mockResolvedValue([]),
        setReportTimestamp: jest.fn(),
      },
    } as unknown as Services

    res = {
      locals: {
        token: 'token',
        csrfToken: 'csrfToken',
      },
    } as unknown as Response

    req = {
      query: {
        dataProductDefinitionsPath: 'token',
      },
      params: {
        reportId: 'reportId',
        variantId: 'variantId',
      },
      body: {
        'filters.field2': 'value2.1',
        'filters.field3.start': '2003-02-01',
        'filters.field3.end': '2006-05-04',
        'filters.field4': 'Fezzick',
        sortBy: 'field5',
        sortDirection: 'true',
        search: 'search',
        variantId: 'variantId',
      },
    } as unknown as Request

    next = ((error: Error) => {
      //
    }) as unknown as NextFunction
  })

  describe('renderFilters', () => {
    it('should get the render data for the filters page', async () => {
      const filterRenderData = <RenderFiltersReturnValue>await AsyncFiltersUtils.default.renderFilters({
        services,
        req,
        res,
        next,
      })

      expect(filterRenderData.reportData.description).toEqual('descriptionFromReport')
      expect(filterRenderData.reportData).toEqual(MockRenderFiltersData.reportData)
      expect(filterRenderData.filters).toEqual(MockRenderFiltersData.filters)
      expect(filterRenderData.sortBy).toEqual(MockRenderFiltersData.sortBy)
    })
  })

  describe('requestReport', () => {
    it('should correctly set the request data', async () => {
      const redirect = await AsyncFiltersUtils.default.requestReport({
        services,
        req,
        res,
        next,
      })

      const resultQuerySummary = {
        query: {
          'filters.field2': 'value2.1',
          'filters.field3.start': '2003-02-01',
          'filters.field3.end': '2006-05-04',
          'filters.field4': 'Fezzick',
          sortBy: 'field5',
          sortDirection: 'true',
        },
        filterData: {
          field2: 'value2.1',
          'field3.start': '2003-02-01',
          'field3.end': '2006-05-04',
          field4: 'Fezzick',
        },
        querySummary: [
          {
            name: 'Field 2',
            value: 'value2.1',
          },
          {
            name: 'Field 3 start',
            value: '01-02-2003',
          },
          {
            name: 'Field 3 end',
            value: '04-05-2006',
          },
          {
            name: 'Field 4',
            value: 'Fezzick',
          },
          {
            name: 'Sort Column',
            value: 'Field 5',
          },
          {
            name: 'Sort Direction',
            value: 'Ascending',
          },
        ],
        sortData: {
          sortBy: 'field5',
          sortDirection: 'true',
        },
      }

      expect(updateStoreSpy).toHaveBeenCalledWith(
        req,
        services,
        mockDefintionVariants[0].specification.fields,
        resultQuerySummary,
        'executionId',
        'tableId',
      )

      expect(redirect).toEqual('polling.pathname')
    })
  })

  describe('getRelativeDateOptions', () => {
    it('should set the correct options for relative dates - all enabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })

      expect(disabled.length).toEqual(0)
    })

    it('should set the correct options for relative dates - next month disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'week').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(1)
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last month disabled', () => {
      const min = dayjs().subtract(1, 'week').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(1)
      expect(options[4].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - next week disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().add(6, 'day').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - last week disabled', () => {
      const min = dayjs().subtract(6, 'day').format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(2)
      expect(options[2].disabled).toBeTruthy()
      expect(options[4].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - tomorrow disabled', () => {
      const min = dayjs().subtract(1, 'month').format('YYYY-MM-DD').toString()
      const max = dayjs().format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[1].disabled).toBeTruthy()
      expect(options[3].disabled).toBeTruthy()
      expect(options[5].disabled).toBeTruthy()
    })

    it('should set the correct options for relative dates - yesterday disabled', () => {
      const min = dayjs().format('YYYY-MM-DD').toString()
      const max = dayjs().add(1, 'month').format('YYYY-MM-DD').toString()
      const options = AsyncFiltersUtils.getRelativeDateOptions(min, max)

      const disabled = options.filter((opt) => {
        return opt.disabled
      })
      expect(disabled.length).toEqual(3)
      expect(options[0].disabled).toBeTruthy()
      expect(options[2].disabled).toBeTruthy()
      expect(options[4].disabled).toBeTruthy()
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
})
