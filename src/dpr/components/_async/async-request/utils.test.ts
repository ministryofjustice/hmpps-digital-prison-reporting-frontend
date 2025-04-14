import { Response, Request, NextFunction } from 'express'
import RequestReportUtils from './utils'

// Mocks
import variant1 from '../../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import mockFiltersData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncRequestFilters'
import dashboardDefinitions from '../../../../../test-app/mocks/mockClients/dashboards/dashboard-definitions'

// Types
import type ReportingService from '../../../services/reportingService'
import { Services } from '../../../types/Services'
import { ReportType } from '../../../types/UserReports'
import { components } from '../../../types/api'
import type DashboardService from '../../../services/dashboardService'
import type RequestedReportService from '../../../services/requestedReportService'
import type RecentlyViewedStoreService from '../../../services/recentlyViewedService'
import { RequestDataResult } from '../../../types/AsyncReportUtils'

describe('RequestReportUtils', () => {
  let services: Services
  let reportingService: ReportingService
  let dashboardService: DashboardService
  let requestedReportService: RequestedReportService
  let recentlyViewedService: RecentlyViewedStoreService
  let res: Response
  let req: Request
  let next: NextFunction
  let mockDefinition: components['schemas']['SingleVariantReportDefinition']
  let mockDefinitions: components['schemas']['ReportDefinitionSummary'][]

  beforeEach(() => {
    mockDefinition = {
      id: 'reportId',
      name: 'reportName',
      description: 'description',
      variant: variant1 as components['schemas']['VariantDefinition'],
    }

    res = {
      locals: {
        user: {
          token: 'ToKeN',
        },
        csfrToken: 'CsRfToKeN',
      },
    } as unknown as Response

    req = {
      params: {
        reportId: 'reportId',
      },
      query: {},
      body: {
        definition: mockDefinition,
      },
    } as unknown as Request
    mockDefinitions = [
      {
        id: 'reportId',
        name: 'DashboardReportName',
        description: 'description',
        variants: [variant1] as components['schemas']['VariantDefinition'][],
        dashboards: [dashboardDefinitions[0]],
      },
    ] as unknown as components['schemas']['ReportDefinitionSummary'][]

    reportingService = {
      getDefinitions: jest.fn().mockResolvedValue(mockDefinitions),
      getDefinition: jest.fn().mockResolvedValue(mockDefinition),
      requestAsyncReport: jest.fn().mockResolvedValue({ executionId: 'executionId', tableId: 'tableId' }),
      cancelAsyncRequest: jest.fn(),
    } as unknown as ReportingService

    dashboardService = {
      getDefinition: jest.fn().mockResolvedValue(dashboardDefinitions[0]),
      cancelAsyncRequest: jest.fn(),
      requestAsyncDashboard: jest.fn().mockResolvedValue({ executionId: 'executionId_dash', tableId: 'tableId_dash' }),
    } as unknown as DashboardService

    recentlyViewedService = {
      getAllReportsById: jest.fn().mockResolvedValue([]),
    } as unknown as RecentlyViewedStoreService

    requestedReportService = {
      getAllReportsById: jest.fn().mockResolvedValue([]),
      addReport: () => {
        //
      },
    } as unknown as RequestedReportService

    services = {
      reportingService,
      dashboardService,
      requestedReportService,
      recentlyViewedService,
    } as unknown as Services

    next = ((error: Error) => {
      //
    }) as unknown as NextFunction

    jest.mock('../../../utils/reportStoreHelper', () => ({
      removeDuplicates: jest.fn(),
    }))
  })

  describe('renderRequest', () => {
    it('should render the request data for a report', async () => {
      req.params = {
        ...req.params,
        id: 'mockVariantId',
        type: ReportType.REPORT,
      }

      const result = await RequestReportUtils.renderRequest({
        req,
        res,
        services,
        next,
      })

      expect(result).toEqual({
        title: "Request report",
        filtersDescription: "Customise your report using the filters below and submit your request.",
        reportData: {
          reportName: 'reportName',
          name: 'Successful Report',
          description: 'this will succeed',
          reportId: 'reportId',
          id: 'mockVariantId',
          definitionPath: undefined,
          csrfToken: 'csrfToken',
          template: undefined,
          type: 'report',
        },
        filtersData: mockFiltersData,
      })
    })

    it('should render the request data for a dashboard', async () => {
      req.params = {
        ...req.params,
        id: 'mockDashboardId',
        type: ReportType.DASHBOARD,
      }

      const result = await RequestReportUtils.renderRequest({
        req,
        res,
        services,
        next,
      })

      expect(result).toEqual({
        title: "Request dashboard",
        filtersDescription: "Customise your dashboard using the filters below and submit your request.",
        reportData: {
          reportName: 'DashboardReportName',
          name: 'reportName',
          description: 'description',
          reportId: 'reportId',
          id: 'mockDashboardId',
          definitionPath: undefined,
          csrfToken: 'csrfToken',
          template: undefined,
          sections: dashboardDefinitions[0].sections,
          type: 'dashboard',
        },
      })
    })

    it('should render the request data for a report with a definition path', async () => {
      req.params = {
        ...req.params,
        id: 'mockVariantId',
        type: ReportType.REPORT,
      }
      req.query = {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      }

      const result = await RequestReportUtils.renderRequest({
        req,
        res,
        services,
        next,
      })

      expect(result).toEqual({
        title: "Request report",
        filtersDescription: "Customise your report using the filters below and submit your request.",
        reportData: {
          reportName: 'reportName',
          name: 'Successful Report',
          description: 'this will succeed',
          reportId: 'reportId',
          id: 'mockVariantId',
          definitionPath: 'dataProductDefinitionsPath',
          csrfToken: 'csrfToken',
          template: undefined,
          type: 'report',
        },
        filtersData: mockFiltersData,
      })
    })

    it('should render the request data for a dashboard with a definition path', async () => {
      req.params = {
        ...req.params,
        id: 'mockDashboardId',
        type: ReportType.DASHBOARD,
      }

      req.query = {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      }

      const result = await RequestReportUtils.renderRequest({
        req,
        res,
        services,
        next,
      })

      expect(result).toEqual({
        title: "Request dashboard",
        filtersDescription: "Customise your dashboard using the filters below and submit your request.",
        reportData: {
          reportName: 'DashboardReportName',
          name: 'reportName',
          description: 'description',
          reportId: 'reportId',
          id: 'mockDashboardId',
          definitionPath: 'dataProductDefinitionsPath',
          csrfToken: 'csrfToken',
          template: undefined,
          sections: dashboardDefinitions[0].sections,
          type: 'dashboard',
        },
      })
    })
  })

  describe('request', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dashboardBody: any

    beforeEach(() => {
      body = {
        dataProductDefinitionsPath: '',
        _csrf: 'csrfToken',
        reportId: 'test-report-3',
        name: 'Successful Report',
        reportName: 'Test Report',
        description: 'this will succeed',
        type: 'report',
        pathname: '/async/report/test-report-3/variantId-1/request',
        origin: 'http://localhost:3010',
        href: 'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        id: 'variantId-1',
        'filters.field1': 'value1.2',
        'filters.field2': 'value2.1',
        'filters.field3.start': '01/02/2003',
        'filters.field3.end': '04/05/2006',
        sortColumn: 'field1',
        sortedAsc: 'true',
      }

      dashboardBody = {
        dataProductDefinitionsPath: '',
        _csrf: 'csrfToken',
        reportId: 'test-report-1',
        name: 'Test Dashboard 1',
        reportName: 'A Test Report',
        description: 'Test Dashboard 1 Description',
        type: 'dashboard',
        pathname: '/async/dashboard/test-report-1/test-dashboard-1/request',
        origin: 'http://localhost:3010',
        href: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request',
        search: '',
        id: 'test-dashboard-1',
        sections: '[{"id":"test-section-id-1"},{"id":"test-section-id-2"}]',
      }
    })

    it('should request a report', async () => {
      const addReportSpy = jest.spyOn(services.requestedReportService, 'addReport')
      req.body = body

      await RequestReportUtils.request({ req, res, services })

      expect(addReportSpy).toHaveBeenCalledWith(
        'userId',
        expect.objectContaining({
          dataProductDefinitionsPath: '',
          type: 'report',
          reportId: 'test-report-3',
          reportName: 'Test Report',
          description: 'this will succeed',
          id: 'variantId-1',
          name: 'Successful Report',
          executionId: 'executionId',
          tableId: 'tableId',
          filters: {
            data: {
              field1: 'value1.2',
              field2: 'value2.1',
              'field3.start': '2003-02-01',
              'field3.end': '2006-05-04',
            },
            queryString: 'field1=value1.2&field2=value2.1&field3.start=2003-02-01&field3.end=2006-05-04',
          },
          sortBy: {
            data: {
              sortColumn: 'field1',
              sortedAsc: 'true',
            },
            queryString: 'sortColumn=field1&sortedAsc=true',
          },
          url: {
            origin: 'http://localhost:3010',
            request: {
              fullUrl:
                'http://localhost:3010/async/report/test-report-3/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
              pathname: '/async/report/test-report-3/variantId-1/request',
              search:
                '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
            },
            polling: {
              fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-1/request/executionId',
              pathname: '/async/report/test-report-3/variantId-1/request/executionId',
            },
            report: {},
          },
          query: {
            data: {
              'filters.field1': 'value1.2',
              'filters.field2': 'value2.1',
              'filters.field3.start': '2003-02-01',
              'filters.field3.end': '2006-05-04',
              sortColumn: 'field1',
              sortedAsc: 'true',
            },
            summary: [
              {
                name: 'Field 1',
                value: 'value1.2',
              },
              {
                name: 'Field 2',
                value: 'value2.1',
              },
              {
                name: 'Field 3 start',
                value: '01/02/2003',
              },
              {
                name: 'Field 3 end',
                value: '04/05/2006',
              },
              {
                name: 'Sort Column',
                value: 'Field 1',
              },
              {
                name: 'Sort Direction',
                value: 'Ascending',
              },
            ],
          },
          status: 'SUBMITTED',
        }),
      )
    })

    it('should request a report using old path', async () => {
      const addReportSpy = jest.spyOn(services.requestedReportService, 'addReport')
      req.body = {
        ...body,
        pathname: '/async-reports/test-report-1/variantId-1/request',
        origin: 'http://localhost:3010',
        href: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
        search:
          '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
      }

      await RequestReportUtils.request({ req, res, services })

      expect(addReportSpy).toHaveBeenCalledWith(
        'userId',
        expect.objectContaining({
          url: {
            origin: 'http://localhost:3010',
            request: {
              fullUrl:
                'http://localhost:3010/async-reports/test-report-1/variantId-1/request?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
              pathname: '/async-reports/test-report-1/variantId-1/request',
              search:
                '?filters.field1=value1.2&filters.field2=value2.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&sortColumn=field1&sortedAsc=true',
            },
            polling: {
              fullUrl: 'http://localhost:3010/async-reports/test-report-1/variantId-1/request/executionId',
              pathname: '/async-reports/test-report-1/variantId-1/request/executionId',
            },
            report: {},
          },
        }),
      )
    })

    it('should request a dashboard ', async () => {
      const addReportSpy = jest.spyOn(services.requestedReportService, 'addReport')
      req.body = dashboardBody

      await RequestReportUtils.request({ req, res, services })

      expect(addReportSpy).toHaveBeenCalledWith(
        'userId',
        expect.objectContaining({
          dataProductDefinitionsPath: '',
          type: 'dashboard',
          reportId: 'test-report-1',
          reportName: 'A Test Report',
          description: 'Test Dashboard 1 Description',
          id: 'test-dashboard-1',
          name: 'Test Dashboard 1',
          executionId: 'executionId_dash',
          tableId: 'tableId_dash',
          url: {
            origin: 'http://localhost:3010',
            request: {
              fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request',
              pathname: '/async/dashboard/test-report-1/test-dashboard-1/request',
              search: '',
            },
            polling: {
              fullUrl: 'http://localhost:3010/async/dashboard/test-report-1/test-dashboard-1/request/executionId_dash',
              pathname: '/async/dashboard/test-report-1/test-dashboard-1/request/executionId_dash',
            },
            report: {},
          },
          status: 'SUBMITTED',
        }),
      )
    })

    it('should request a report with a definition path', async () => {
      const addReportSpy = jest.spyOn(services.requestedReportService, 'addReport')
      req.body = {
        ...body,
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      }

      await RequestReportUtils.request({ req, res, services })

      expect(addReportSpy).toHaveBeenCalledWith(
        'userId',
        expect.objectContaining({
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
        }),
      )
    })

    it('should request a dashboard with a definition path', async () => {
      const addReportSpy = jest.spyOn(services.requestedReportService, 'addReport')
      req.body = {
        ...dashboardBody,
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      }

      await RequestReportUtils.request({ req, res, services })

      expect(addReportSpy).toHaveBeenCalledWith(
        'userId',
        expect.objectContaining({
          dataProductDefinitionsPath: 'dataProductDefinitionsPath',
        }),
      )
    })
  })

  describe('cancelRequest', () => {
    it('should cancel the report request', async () => {
      const cancelRequestSpy = jest.spyOn(services.reportingService, 'cancelAsyncRequest')
      req.body = { reportId: 'reportId', id: 'id', executionId: 'executionId', type: ReportType.REPORT }

      await RequestReportUtils.cancelRequest({ req, res, services })

      expect(cancelRequestSpy).toHaveBeenCalledWith('ToKeN', 'reportId', 'id', 'executionId')
    })

    it('should cancel the dashboard request', async () => {
      const cancelDashboardRequestSpy = jest.spyOn(services.dashboardService, 'cancelAsyncRequest')
      req.body = { reportId: 'reportId', id: 'id', executionId: 'executionId', type: ReportType.DASHBOARD }

      await RequestReportUtils.cancelRequest({ req, res, services })

      expect(cancelDashboardRequestSpy).toHaveBeenCalledWith('ToKeN', 'reportId', 'id', 'executionId')
    })
  })
})
