import { Response, Request, NextFunction } from 'express'
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
      (v) => v.id === 'variantId-12',
    ) as components['schemas']['VariantDefinition'][]

    mockReport = {
      id: 'mockReport',
      name: 'name',
      description: 'description',
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

      expect(filterRenderData.reportData).toEqual(MockRenderFiltersData.reportData)
      expect(filterRenderData.filters).toEqual(MockRenderFiltersData.filters)
      expect(filterRenderData.sortBy).toEqual(MockRenderFiltersData.sortBy)
    })
  })

  describe('requestReport', () => {
    it('should get the render data for the filters page', async () => {
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
})
