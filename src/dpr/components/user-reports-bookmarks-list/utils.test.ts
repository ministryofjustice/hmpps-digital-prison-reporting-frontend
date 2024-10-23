import { Response, Request } from 'express'
import { Services } from '../../types/Services'
import BookmarkUtils from './utils'
import type BookmarkService from '../../services/bookmarkService'
import type ReportingService from '../../services/reportingService'
import DashboardService from '../../services/dashboardService'
import { components } from '../../types/api'
import variant1 from '../../../../test-app/mocks/mockClients/reports/mockVariants/variant1'
import dashboardDefinitions from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardDefinition'

describe('BookmarkUtils', () => {
  let services: Services
  let res: Response
  let req: Request
  let bookmarkService: BookmarkService
  let reportingService: ReportingService
  let dashboardService: DashboardService
  let mockDefinition: components['schemas']['SingleVariantReportDefinition']

  describe('renderBookmarkList', () => {
    beforeEach(() => {
      res = {
        locals: {
          user: {
            uuid: 'UuId',
            token: 'tOkEn',
          },
          csfrToken: 'CsRfToKeN',
        },
      } as unknown as Response

      req = {
        query: {},
      } as unknown as Request

      bookmarkService = {
        getAllBookmarks: jest.fn().mockResolvedValue([{ reportId: 'test-report-1', variantId: 'test-variant-1' }]),
        createBookMarkToggleHtml: jest.fn().mockResolvedValue('<p>Bookmark toggle</p>'),
      } as unknown as BookmarkService

      mockDefinition = {
        id: 'reportId',
        name: 'reportName',
        description: 'description',
        variant: variant1 as components['schemas']['VariantDefinition'],
      }

      reportingService = {
        getDefinition: jest.fn().mockResolvedValue(mockDefinition),
      } as unknown as ReportingService

      dashboardService = {
        getDefinition: jest.fn().mockResolvedValue(dashboardDefinitions[0]),
      } as unknown as DashboardService

      services = {
        bookmarkService,
        reportingService,
        dashboardService,
      } as unknown as Services
    })

    it('should render the bookmark list', async () => {
      const result = await BookmarkUtils.renderBookmarkList({
        services,
        maxRows: 10,
        res,
        req,
      })

      expect(result.tableData.rows.length).toEqual(1)
      expect(result.tableData.rows[0][0].text).toContain('reportName')
      expect(result.tableData.rows[0][1].html).toContain('Successful Report')
      expect(result.tableData.rows[0][3].html).toContain('report')
      expect(result.tableData.rows[0][4].html).toContain('Bookmark toggle')
    })
  })
})
