import { Request, Response } from 'express'
import { Url } from 'url'
import Dict = NodeJS.Dict

// types
import ReportQuery from '../../../types/ReportQuery'
import type { components } from '../../../types/api'
import type { AsyncSummary, RequestedReport } from '../../../types/UserReports'
import type { Columns } from '../../_reports/report-columns-form/types'
import type { Template } from '../../../types/Templates'

// Utils
import AsyncReportUtils from './utils'
import * as AsyncReportListUtilsHelper from './utils'
import ColumnUtils from '../../_reports/report-columns-form/utils'
import PaginationUtils from '../../_reports/report-pagination/utils'

// Mocked
import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'
import definitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import {
  mockReportListRenderData,
  mockGetReportListRenderData,
} from '../../../../../test-app/mocks/mockAsyncData/mockReportListRenderData'

// Services
import ReportingService from '../../../services/reportingService'
import RequestedReportService from '../../../services/requestedReportService'
import BookmarkService from '../../../services/bookmarkService'
import DashboardService from '../../../services/dashboardService'
import DownloadPermissionService from '../../../services/downloadPermissionService'
import RecentlyViewedStoreService from '../../../services/recentlyViewedService'
import variant2 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/variant2')
import { Services } from '../../../types/Services'
import variant9 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/variant9')
import variant26 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/variant26-parent-child')
import { ChildData } from '../../../utils/ParentChildDataTableBuilder/types'
import variant10 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/variant10')

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

const mockReportData = createMockData(10)

const reportState = {
  id: 'id',
  variantId: 'id',
  reportId: 'reportId',
  reportName: 'reportName',
  name: 'variantName',
  tableId: 'tableId',
  type: 'report',
  variantName: 'variantName',
  executionId: 'executionId',
  query: { summary: 'summary' },
  description: 'description',
  url: {
    request: {
      fullUrl: 'fullUrl',
    },
    report: {
      default: 'defaultQuery',
    },
  },
  timestamp: {
    requested: 'ts',
  },
} as unknown as RequestedReport

describe('AsyncReportListUtils', () => {
  const PaginationUtilsSpy = jest.spyOn(PaginationUtils, 'getPaginationData')
  const fieldNames = ['field2', 'column']

  describe('getRenderData', () => {
    it('should return data to render the report list', async () => {
      const mockReq = { query: { columns: fieldNames } } as unknown as Request
      const mockSpecification = definitions.report.variants[1].specification
      const specification: components['schemas']['Specification'] = {
        template: mockSpecification.template as
          | 'list'
          | 'list-section'
          | 'list-tab'
          | 'summary'
          | 'summary-section'
          | 'parent-child',
        fields: mockSpecification.fields as components['schemas']['FieldDefinition'][],
        sections: [],
      }
      const querySummary: Array<Dict<string>> = [
        {
          query: 'summary',
        },
      ]
      const columns: Columns = ColumnUtils.getColumns(specification, fieldNames)

      const result = AsyncReportListUtilsHelper.getRenderData(
        mockReq,
        specification,
        mockReportData,
        100,
        querySummary,
        {},
        columns,
        {} as ReportQuery,
        false,
      )

      expect(PaginationUtilsSpy).toHaveBeenCalledWith({ pathname: 'pathname', search: 'search' }, 100)
      expect(result).toEqual(mockReportListRenderData)
    })
  })

  describe('renderReport', () => {
    beforeEach(async () => {
      jest.clearAllMocks()
      jest.spyOn(PaginationUtils, 'getPaginationData')
      jest.spyOn(ColumnUtils, 'getColumns')
    })

    it('should return data to render the report list', async () => {
      const mockReq = {
        query: {
          columns: ['column'],
        },
        params: {
          reportId: 'reportId',
          variantId: 'variantId',
          id: 'id',
          tableId: 'tableId',
        },
      } as unknown as Request
      const mockRes = {
        locals: { user: { token: 'token' }, bookmarkingEnabled: true },
      } as unknown as Response

      const mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(reportState)
          })
        }),
      } as unknown as RequestedReportService

      const mockBookmarkService = {
        isBookmarked: jest.fn().mockReturnValue(false),
      } as unknown as BookmarkService

      const mockDashboardService = {} as unknown as DashboardService

      const downloadPermissionService = {
        downloadEnabled: jest.fn().mockResolvedValue(true),
      } as unknown as DownloadPermissionService

      const mockRecentlyViewedStoreService = {
        setRecentlyViewed: jest.fn(),
      } as unknown as RecentlyViewedStoreService

      const mockReportingService = {
        getAsyncCount: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(100)
          })
        }),
        getAsyncInteractiveCount: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve(100)
          })
        }),
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-3',
              name: 'C Test Report',
              variant: variant2,
            })
          })
        }),
        getAsyncReport: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            const data = createMockData(10)
            resolve(data)
          })
        }),
      } as unknown as ReportingService

      const services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
        recentlyViewedService: mockRecentlyViewedStoreService,
        bookmarkService: mockBookmarkService,
        dashboardService: mockDashboardService,
        downloadPermissionService,
      }

      const result = await AsyncReportUtils.renderReport({
        req: mockReq,
        res: mockRes,
        services,
      })

      expect(result).toEqual(mockGetReportListRenderData)
    })
  })

  describe('getData', () => {
    let req: Request
    let token: string
    let userId: string
    let services: Services
    let mockReportingService: ReportingService
    let mockAsyncReportsStore: RequestedReportService

    beforeEach(() => {
      req = {
        query: {
          columns: ['column'],
        },
        params: {
          reportId: 'reportId',
          variantId: 'variantId',
          id: 'id',
          tableId: 'tableId',
        },
      } as unknown as Request

      token = 'token'
      userId = 'userId'

      mockReportingService = {
        getDefinition: jest.fn(),
        getAsyncReport: jest.fn(),
        getAsyncSummaryReport: jest.fn(),
      } as unknown as ReportingService

      mockAsyncReportsStore = {
        updateLastViewed: jest.fn(),
        getReportByTableId: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              ...reportState,
              childExecutionData: [
                {
                  variantId: 'variantId-26-child',
                  tableId: 'childTableID',
                },
              ],
            })
          })
        }),
      } as unknown as RequestedReportService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services
    })

    it('should get the data for a list report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-3',
              name: 'C Test Report',
              variant: variant2,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({ req, services, token, userId })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(1)
      expect(services.reportingService.getAsyncSummaryReport).not.toHaveBeenCalled()
    })

    it('should get the data for a summaries report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-2',
              name: 'B Test Report',
              variant: variant9,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({
        req,
        services,
        token,
        userId,
      })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(1)
      expect(services.reportingService.getAsyncSummaryReport).toHaveBeenCalled()
    })

    it('should get the data for a parent child report', async () => {
      mockReportingService = {
        ...mockReportingService,
        getDefinition: jest.fn().mockImplementation(() => {
          return new Promise((resolve) => {
            resolve({
              id: 'test-report-1',
              name: 'A Test Report',
              variant: variant26,
            })
          })
        }),
      } as unknown as ReportingService

      services = {
        requestedReportService: mockAsyncReportsStore,
        reportingService: mockReportingService,
      } as unknown as Services

      await AsyncReportListUtilsHelper.getData({
        req,
        services,
        token,
        userId,
      })

      expect(services.requestedReportService.getReportByTableId).toHaveBeenCalled()
      expect(services.reportingService.getAsyncReport).toHaveBeenCalledTimes(2)
      expect(services.reportingService.getAsyncSummaryReport).not.toHaveBeenCalled()

      expect(services.reportingService.getAsyncReport).toHaveBeenNthCalledWith(
        1,
        'token',
        'reportId',
        'variantId',
        'tableId',
        {
          columns: ['column'],
          pageSize: '50000',
          selectedPage: '1',
          sortColumn: undefined,
          sortedAsc: 'true',
        },
      )
      expect(services.reportingService.getAsyncReport).toHaveBeenNthCalledWith(
        2,
        'token',
        'reportId',
        'variantId-26-child',
        'childTableID',
        {
          columns: ['column'],
          pageSize: '50000',
          selectedPage: '1',
          sortColumn: undefined,
          sortedAsc: 'true',
        },
      )
    })
  })

  describe('getTableData', () => {
    let definition: components['schemas']['SingleVariantReportDefinition']
    let columns: Columns
    let reportData: Dict<string>[]
    let childData: ChildData[]
    let summariesData: AsyncSummary[]
    let reportQuery: ReportQuery

    beforeEach(() => {
      columns = {
        name: 'columns',
        options: [
          {
            text: 'Field 1',
            value: 'field1',
            disabled: false,
          },
        ],
        text: 'Select report columns',
        value: ['field1'],
      }

      reportData = createMockData(5)
    })

    it('should get the table data for a list table', () => {
      definition = {
        id: 'test-report-3',
        name: 'C Test Report',
        variant: variant2,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      const expectedTable = {
        colCount: 1,
        head: [{ classes: null, text: 'Field 1' }],
        rowCount: 5,
        rows: [
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
        ],
      }

      const dataTable = AsyncReportListUtilsHelper.getTableData(definition, columns, reportData, [], [], reportQuery)
      expect(dataTable).toEqual(expectedTable)
    })

    it('should get the table data for a summary table', () => {
      definition = {
        id: 'test-report-2',
        name: 'B Test Report',
        variant: variant10,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      summariesData = [
        {
          id: 'summary1',
          template: 'page-header',
          fields: [
            {
              name: 'total',
              display: 'Total',
            },
          ],
          data: [
            {
              total: '52',
            },
          ],
        },
        {
          id: 'summary3',
          template: 'page-footer',
          fields: [
            {
              name: 'percentGood',
              display: 'Good (%)',
            },
            {
              name: 'percentBad',
              display: 'Bad (%)',
            },
            {
              name: 'percentUgly',
              display: 'Ugly (%)',
            },
          ],
          data: [
            {
              percentGood: '1',
              percentBad: '10',
              percentUgly: '98',
            },
          ],
        },
        {
          id: 'summary6',
          template: 'table-header',
          fields: [
            {
              name: 'field1',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field2',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field3',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field4',
              display: 'Field 1',
              type: 'string',
            },
          ],
          data: [
            {
              section1: 'One',
              section2: 'A',
              field1: 'Section One A Header',
              field2: '1',
              field3: '12219380923',
              field4: '4 Freds',
            },
            {
              section1: 'Two',
              section2: 'A',
              field1: 'Section Two A Header',
              field2: '1',
              field3: '12219380923',
              field4: '5 Freds',
            },
          ],
        },
        {
          id: 'summary7',
          template: 'table-footer',
          fields: [
            {
              name: 'field1',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field2',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field3',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field4',
              display: 'Field 1',
              type: 'string',
            },
          ],
          data: [
            {
              section1: 'One',
              section2: 'A',
              field1: 'Section One A Footer',
              field2: '1',
              field3: '12219380923',
              field4: '6 Freds',
            },
            {
              section1: 'One',
              section2: 'B',
              field1: 'Section One B Footer',
              field2: '1',
              field3: '12219380923',
              field4: '7 Freds',
            },
          ],
        },
      ]

      const expectedTable = {
        head: null,
        rows: [
          [
            {
              colspan: 1,
              html: "<h2>First: One, Second: A <span class='govuk-caption-m'>1 result</span></h2>",
            },
          ],
          [
            {
              text: 'Field 1',
              classes: 'govuk-table__header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Section One A Header',
              format: 'string',
              classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Value 1',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Section One A Footer',
              format: 'string',
              classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
            },
          ],
          [
            {
              colspan: 1,
              html: "<h2>First: One, Second: B <span class='govuk-caption-m'>2 results</span></h2>",
            },
          ],
          [
            {
              text: 'Field 1',
              classes: 'govuk-table__header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Value 1',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Value 1',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Section One B Footer',
              format: 'string',
              classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
            },
          ],
          [
            {
              colspan: 1,
              html: "<h2>First: Two, Second: A <span class='govuk-caption-m'>1 result</span></h2>",
            },
          ],
          [
            {
              text: 'Field 1',
              classes: 'govuk-table__header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Section Two A Header',
              format: 'string',
              classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Value 1',
              format: 'string',
              classes: '',
            },
          ],
          [
            {
              colspan: 1,
              html: "<h2>First: Two, Second: B <span class='govuk-caption-m'>1 result</span></h2>",
            },
          ],
          [
            {
              text: 'Field 1',
              classes: 'govuk-table__header',
            },
          ],
          [
            {
              fieldName: 'field1',
              text: 'Value 1',
              format: 'string',
              classes: '',
            },
          ],
        ],
        rowCount: 5,
        colCount: 1,
      }

      const dataTable = AsyncReportListUtilsHelper.getTableData(
        definition,
        columns,
        reportData,
        [],
        summariesData,
        reportQuery,
      )

      expect(dataTable).toEqual(expectedTable)
    })

    it('should get the table data for a parent/child table', () => {
      definition = {
        id: 'test-report-1',
        name: 'A Test Report',
        variant: variant26,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      childData = [
        {
          id: 'variantId-26-child',
          data: [
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'One',
              section2: 'A',
            },
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'Two',
              section2: 'B',
            },
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'One',
              section2: 'B',
            },
          ],
        },
      ]

      const expectedTable = {
        colCount: 1,
        head: null,
        rowCount: 5,
        rows: [
          [{ classes: 'govuk-table__header', text: 'Second' }],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              colspan: 1,
              format: 'string',
              html: "<div class='dpr-child-report'><h3>Child Report</h3><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr></tbody></table></div>",
            },
          ],
          [{ classes: 'govuk-table__header', text: 'Second' }],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              classes: '',
              fieldName: 'field1',
              format: 'string',
              text: 'Value 1',
            },
          ],
          [
            {
              colspan: 1,
              format: 'string',
              html: "<div class='dpr-child-report'><h3>Child Report</h3><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr></tbody></table></div>",
            },
          ],
        ],
      }

      const dataTable = AsyncReportListUtilsHelper.getTableData(
        definition,
        columns,
        reportData,
        childData,
        [],
        reportQuery,
      )

      expect(dataTable).toEqual(expectedTable)
    })
  })
})
