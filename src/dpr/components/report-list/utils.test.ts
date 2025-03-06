import { NextFunction, Request, Response } from 'express'
import * as ReportListUtils from './utils'
import { ListDataSources, RenderListWithDataInput, RenderListWithDefinitionInput } from './types'
import ReportDefinition from '../../../../test-app/mocks/mockSyncData/reportDefinition'
import {
  mockRenderDataFromDefinition,
  mockRenderDataFromData,
} from '../../../../test-app/mocks/mockSyncData/mockRenderData'
import { components } from '../../types/api'
import ReportQuery from '../../types/ReportQuery'

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

jest.mock('../../data/reportingClient.ts', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getDefinition: jest.fn().mockResolvedValue(ReportDefinition.singleVariantReport('test-variant')),
      getListWithWarnings: jest.fn().mockResolvedValue(['']),
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
      }

      const expectedParams = mockRenderDataFromDefinition
      await ReportListUtils.renderListWithDefinition(args)
      expect(response.render).toHaveBeenCalledWith('dpr/components/report-list/list', expectedParams)
    })
  })

  describe('renderListWithData', () => {
    it('should render the list', async () => {
      const args: RenderListWithDataInput = {
        title: 'Test title',
        reportName: 'reportName',
        variantDefinition: ReportDefinition.variant as unknown as components['schemas']['VariantDefinition'],
        request,
        response,
        next,
        getListDataSources: (reportQuery: ReportQuery) => {
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
