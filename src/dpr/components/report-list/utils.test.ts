import { NextFunction, Request, Response } from 'express'
import * as ReportListUtils from './utils'
import { ListDataSources, RenderListWithDataInput, RenderListWithDefinitionInput } from './types'
import ReportDefinition from '../../../../test-app/mocks/mockSyncData/reportDefinition'
import {
  mockRenderDataFromDefinition,
  mockRenderDataFromData,
} from '../../../../test-app/mocks/mockSyncData/mockRenderData'
import { components } from '../../types/api'

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

describe('EmbeddedReportListUtils', () => {
  let request: Request
  let response: Response
  let next: NextFunction

  beforeEach(() => {
    request = {
      query: {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      },
    } as unknown as Request

    response = {
      render: jest.fn().mockImplementation(() => {
        //  do nothing
      }),
    } as unknown as Response

    next = ((error: Error) => {
      //
    }) as unknown as NextFunction
  })

  describe('renderListWithDefinition', () => {
    it('should render the list', async () => {
      const args: RenderListWithDefinitionInput = {
        title: 'Test Report Name',
        definitionName: 'test-definition-name',
        variantName: 'Test Variant Name',
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
      const args: RenderListWithDefinitionInput = {
        definitionName: 'test-definition-name',
        variantName: 'Test Variant Name',
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
      expectedParams.renderData.actions[1].href = 'mailto:?subject=Test Report-Test Variant&body=pathname'

      await ReportListUtils.renderListWithDefinition(args)
      expect(response.render).toHaveBeenCalledWith('dpr/components/report-list/list', expectedParams)
    })

    it('should use the provided definition path', async () => {
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

      expect(getDefinition).toHaveBeenNthCalledWith(3, 'Token', 'incident-report', 'summary', 'path/from/handler')
    })

    it('should use the provided query definition path', async () => {
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
        4,
        'Token',
        'incident-report',
        'summary',
        'dataProductDefinitionsPath',
      )
    })
  })

  describe('renderListWithData', () => {
    it('should render the list', async () => {
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
