import { NextFunction, Request, Response } from 'express'
import * as ReportListUtils from './utils'
import { ListDataSources, RenderListWithDataInput, RenderListWithDefinitionInput } from './types'
import ReportDefinition from '../../../../test-app/mocks/mockSyncData/reportDefinition'
import {
  mockRenderDataFromDefinition,
  mockRenderDataFromData,
} from '../../../../test-app/mocks/mockSyncData/mockRenderData'
import { components } from '../../types/api'
import FilterUtils from '../_filters/utils'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const getListWithWarnings = jest.fn().mockResolvedValue([''])
const getDefinition = jest.fn().mockResolvedValue(ReportDefinition.singleVariantReport('test-variant'))

jest.mock('../../data/reportingClient.ts', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getDefinition,
      getListWithWarnings,
      getCount: jest.fn().mockResolvedValue(''),
    }
  })
})

describe('ReportListUtils', () => {
  let request: Request
  let response: Response
  let next: NextFunction

  beforeEach(() => {
    request = {
      query: {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      },
      baseUrl: 'baseUrl',
      path: 'path',
    } as unknown as Request

    response = {
      render: jest.fn().mockImplementation(() => {
        //  do nothing
      }),
      redirect: jest.fn().mockImplementation(() => {
        //  do nothing
      }),
    } as unknown as Response

    next = ((error: Error) => {
      //
    }) as unknown as NextFunction
  })

  describe('renderListWithDefinition', () => {
    it('should should redirect with default values', async () => {
      const args: RenderListWithDefinitionInput = {
        title: 'Test Report Name',
        definitionName: 'test-definition-name',
        variantName: 'Test Variant',
        request,
        response,
        next,
        layoutTemplate: '',
        token: 'Token',
        apiUrl: 'apiUrl',
        apiTimeout: 8000,
      }

      await ReportListUtils.renderListWithDefinition(args)
      expect(response.redirect).toHaveBeenCalledWith(
        'baseUrlpath?selectedPage=1&pageSize=20&sortColumn=field1&sortedAsc=true&columns=field1&columns=field2&columns=field3&columns=field6&dataProductDefinitionsPath=dataProductDefinitionsPath&filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=value8.2&filters.field7=value8.3',
      )
    })

    it('should render the list', async () => {
      request = {
        query: {
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
          'filters.field1': 'value1.1',
          'filters.field3.start': '2003-02-01',
          'filters.field3.end': '2006-05-04',
          'filters.field7': ['value8.2', 'value8.3'],
        },
        baseUrl: 'baseUrl',
        path: 'path',
        get: jest.fn().mockReturnValue('host'),
        originalUrl: 'originalUrl',
        protocol: 'protocol',
      } as unknown as Request

      jest.spyOn(FilterUtils, 'redirectWithDefaultFilters').mockReturnValue(false)
      const args: RenderListWithDefinitionInput = {
        title: 'Test Report Name',
        definitionName: 'test-definition-name',
        variantName: 'Test Variant',
        request,
        response,
        next,
        layoutTemplate: '',
        token: 'Token',
        apiUrl: 'apiUrl',
        apiTimeout: 8000,
      }

      const expectedParams = mockRenderDataFromDefinition
      await ReportListUtils.renderListWithDefinition(args)
      expect(response.render).toHaveBeenCalledWith('dpr/components/report-list/list', expectedParams)
    })

    it('should render the list with DPD report name', async () => {
      request = {
        query: {
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
          'filters.field1': 'value1.1',
          'filters.field3.start': '2003-02-01',
          'filters.field3.end': '2006-05-04',
          'filters.field7': ['value8.2', 'value8.3'],
        },
        baseUrl: 'baseUrl',
        path: 'path',
        get: jest.fn().mockReturnValue('host'),
        originalUrl: 'originalUrl',
        protocol: 'protocol',
      } as unknown as Request

      jest.spyOn(FilterUtils, 'redirectWithDefaultFilters').mockReturnValue(false)
      const args: RenderListWithDefinitionInput = {
        definitionName: 'test-definition-name',
        variantName: 'Test Variant',
        request,
        response,
        next,
        layoutTemplate: '',
        token: 'Token',
        apiUrl: 'apiUrl',
        apiTimeout: 8000,
      }

      const expectedParams = mockRenderDataFromDefinition
      expectedParams.renderData.reportName = 'Test Report'
      expectedParams.renderData.actions[1].href =
        'mailto:?subject=Test Report-Test Variant&body=protocol%3A%2F%2FhostoriginalUrl'

      await ReportListUtils.renderListWithDefinition(args)
      expect(response.render).toHaveBeenCalledWith('dpr/components/report-list/list', expectedParams)
    })

    it('should use the provided definition path', async () => {
      jest.spyOn(FilterUtils, 'redirectWithDefaultFilters').mockReturnValue(false)
      request = {
        query: {},
      } as unknown as Request
      const args: RenderListWithDefinitionInput = {
        title: 'Incident report summary',
        definitionName: 'incident-report',
        variantName: 'summary',
        request,
        response,
        next,
        layoutTemplate: '',
        token: 'Token',
        apiUrl: 'apiUrl',
        apiTimeout: 8000,
        definitionsPath: 'path/from/handler',
      }

      await ReportListUtils.renderListWithDefinition(args)

      expect(getListWithWarnings).toHaveBeenNthCalledWith(3, 'reports/list', 'Token', {
        columns: ['field1', 'field2', 'field3', 'field6'],
        dataProductDefinitionsPath: 'path/from/handler',
        filters: {},
        filtersPrefix: 'filters.',
        pageSize: 20,
        selectedPage: 1,
        sortColumn: 'field1',
        sortedAsc: true,
      })

      expect(getDefinition).toHaveBeenNthCalledWith(4, 'Token', 'incident-report', 'summary', 'path/from/handler')
    })

    it('should use the provided query definition path', async () => {
      jest.spyOn(FilterUtils, 'redirectWithDefaultFilters').mockReturnValue(false)
      request = {
        query: {},
      } as unknown as Request
      const args: RenderListWithDefinitionInput = {
        title: 'Incident report summary',
        definitionName: 'incident-report',
        variantName: 'summary',
        request,
        response,
        next,
        layoutTemplate: '',
        token: 'Token',
        apiUrl: 'apiUrl',
        apiTimeout: 8000,
        definitionsPath: 'dataProductDefinitionsPath',
      }

      await ReportListUtils.renderListWithDefinition(args)

      expect(getListWithWarnings).toHaveBeenNthCalledWith(4, 'reports/list', 'Token', {
        columns: ['field1', 'field2', 'field3', 'field6'],
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
        filters: {},
        filtersPrefix: 'filters.',
        pageSize: 20,
        selectedPage: 1,
        sortColumn: 'field1',
        sortedAsc: true,
      })

      expect(getDefinition).toHaveBeenNthCalledWith(
        5,
        'Token',
        'incident-report',
        'summary',
        'dataProductDefinitionsPath',
      )
    })
  })

  describe('renderListWithData', () => {
    it('should render the list', async () => {
      jest.spyOn(FilterUtils, 'redirectWithDefaultFilters').mockReturnValue(false)

      request = {
        query: {
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
          'filters.field1': 'value1.1',
          'filters.field3.start': '2003-02-01',
          'filters.field3.end': '2006-05-04',
          'filters.field7': ['value8.2', 'value8.3'],
        },
        baseUrl: 'baseUrl',
        path: 'path',
        get: jest.fn().mockReturnValue('host'),
        originalUrl: 'originalUrl',
        protocol: 'protocol',
      } as unknown as Request

      const args: RenderListWithDataInput = {
        title: 'Test variant title',
        reportName: 'Test report name',
        variantDefinition: ReportDefinition.variant as unknown as components['schemas']['VariantDefinition'],
        request,
        response,
        next,
        getListDataSources: () => {
          return {
            data: [],
            count: 0,
          } as unknown as ListDataSources
        },
        layoutTemplate: 'layoutTemplate',
        dynamicAutocompleteEndpoint: 'dynamicAutocompleteEndpoint',
      }

      const expectedParams = mockRenderDataFromData
      await ReportListUtils.default.renderListWithData(args)
      expect(response.render).toHaveBeenCalledWith('dpr/components/report-list/list', expectedParams)
    })
  })
})
