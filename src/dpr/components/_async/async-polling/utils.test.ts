import { Response, Request } from 'express'
import { ReportType } from '../../../types/UserReports'
import type { Services } from '../../../types/Services'
import type { RequestedReportService } from '../../../services'
import PollingUtils from './utils'

import MockRequestedListData2 from '../../../../../test-app/mocks/mockClients/store/mockRequestedUserListDataV2'
import MockRequestedDashboardData from '../../../../../test-app/mocks/mockClients/store/mockRequestedDashboardData'

describe('PollingUtils', () => {
  let services: Services
  let res: Response
  let req: Request
  let requestedReportService: RequestedReportService

  beforeEach(() => {
    res = {
      locals: {
        user: {
          uuid: 'UsErId',
        },
        csfrToken: 'CsRfToKeN',
        definitionsPath: 'dataProductDefinitionsPath',
      },
    } as unknown as Response

    req = {
      params: {
        reportId: 'reportId',
        variantId: 'variantId',
        executionId: 'executionId',
        id: 'id',
        type: ReportType.REPORT,
      },
      query: {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      },
    } as unknown as Request
  })

  describe('renderPolling', () => {
    it('should get the data to render polling for a report', async () => {
      req.params = {
        reportId: 'reportId',
        id: 'id',
        executionId: 'executionId',
        type: ReportType.REPORT,
      }

      requestedReportService = {
        getReportByExecutionId: jest.fn().mockResolvedValue(MockRequestedListData2.requestedSubmitted),
      } as unknown as RequestedReportService

      services = {
        requestedReportService,
      } as unknown as Services

      const renderData = await PollingUtils.renderPolling({
        res,
        req,
        services,
      })

      const expectedResult = {
        title: 'Report request status',
        pollingRenderData: {
          csrfToken: 'csrfToken',
          definitionPath: 'dataProductDefinitionsPath',
          description: 'this will fail with returned Status: FAILED',
          executionId: 'executionId',
          id: 'id',
          name: 'Submitted report v2',
          querySummary: [
            { name: 'Field 1', value: 'value1.1' },
            { name: 'Field 2', value: 'value2.1' },
            { name: 'Field 3 start', value: '01/02/2003' },
            { name: 'Field 3 end', value: '04/05/2006' },
            { name: 'Field 4', value: 'Inigo Montoya' },
            { name: 'Sort Column', value: 'Field 1' },
            { name: 'Sort Direction', value: 'Ascending' },
          ],
          reportId: 'reportId',
          reportName: 'Test Report',
          requestUrl:
            'http://localhost:3010/async/report/test-report-3/variantId-2/request?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1&filters.field4=Inigo+Montoya',
          requestedAt: '2024-10-24T10:28:15.792Z',
          status: 'SUBMITTED',
          tableId: 'tblId_1729765698654',
          type: 'report',
        },
      }

      expect(renderData).toEqual(expectedResult)
    })

    it('should get the data to render polling for a report with variant id', async () => {
      req.params = {
        reportId: 'reportId',
        variantId: 'id',
        executionId: 'executionId',
        type: ReportType.REPORT,
      }

      requestedReportService = {
        getReportByExecutionId: jest.fn().mockResolvedValue(MockRequestedListData2.requestedSubmitted),
      } as unknown as RequestedReportService

      services = {
        requestedReportService,
      } as unknown as Services

      const renderData = await PollingUtils.renderPolling({
        res,
        req,
        services,
      })

      const expectedResult = {
        title: 'Report request status',
        pollingRenderData: {
          csrfToken: 'csrfToken',
          definitionPath: 'dataProductDefinitionsPath',
          description: 'this will fail with returned Status: FAILED',
          executionId: 'executionId',
          id: 'id',
          name: 'Submitted report v2',
          querySummary: [
            { name: 'Field 1', value: 'value1.1' },
            { name: 'Field 2', value: 'value2.1' },
            { name: 'Field 3 start', value: '01/02/2003' },
            { name: 'Field 3 end', value: '04/05/2006' },
            { name: 'Field 4', value: 'Inigo Montoya' },
            { name: 'Sort Column', value: 'Field 1' },
            { name: 'Sort Direction', value: 'Ascending' },
          ],
          reportId: 'reportId',
          reportName: 'Test Report',
          requestUrl:
            'http://localhost:3010/async/report/test-report-3/variantId-2/request?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=true&filters.field2=value2.1&filters.field4=Inigo+Montoya',
          requestedAt: '2024-10-24T10:28:15.792Z',
          status: 'SUBMITTED',
          tableId: 'tblId_1729765698654',
          type: 'report',
        },
      }

      expect(renderData).toEqual(expectedResult)
    })

    it('should get the data to render polling for a dashboard', async () => {
      req.params = {
        reportId: 'reportId',
        variantId: 'id',
        executionId: 'executionId',
        type: ReportType.DASHBOARD,
      }

      requestedReportService = {
        getReportByExecutionId: jest.fn().mockResolvedValue(MockRequestedDashboardData.submittedDashboard),
      } as unknown as RequestedReportService

      services = {
        requestedReportService,
      } as unknown as Services

      const renderData = await PollingUtils.renderPolling({
        res,
        req,
        services,
      })

      const expectedResult = {
        title: 'Dashboard request status',
        pollingRenderData: {
          csrfToken: 'csrfToken',
          definitionPath: 'dataProductDefinitionsPath',
          description: 'This dashboard is pending',
          executionId: 'executionId',
          id: 'id',
          name: 'Requested dashboard',
          reportId: 'reportId',
          reportName: 'Test Report',
          requestUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request?',
          requestedAt: '2024-08-29T14:51:33.557Z',
          status: 'SUBMITTED',
          tableId: 'tblId_1724943092098',
          type: 'dashboard',
        },
      }

      expect(renderData).toEqual(expectedResult)
    })
  })
})
