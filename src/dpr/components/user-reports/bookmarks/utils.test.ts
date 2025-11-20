import { expect, jest } from '@jest/globals'
import { Response } from 'express'
import { Services } from '../../../types/Services'
import BookmarkUtils from './utils'
import type BookmarkService from '../../../routes/journeys/my-reports/bookmarks/service'
import type ReportingService from '../../../services/reportingService'
import DashboardService from '../../../services/dashboardService'
import { components } from '../../../types/api'
import variant1 from '../../../../../test-app/mocks/mockClients/reports/mockVariants/request-examples/success'
import dashboardDefinitions from '../../../../../test-app/mocks/mockClients/dashboards/dashboard-definitions'

describe('BookmarkUtils', () => {
  let services: Services
  let res: Response
  let bookmarkService: BookmarkService
  let reportingService: ReportingService
  let dashboardService: DashboardService
  let mockDefinition: components['schemas']['SingleVariantReportDefinition']

  describe('renderBookmarkList', () => {
    beforeEach(() => {
      res = {
        locals: {
          dprUser: {
            id: 'UuId',
            token: 'tOkEn',
          },
          csfrToken: 'CsRfToKeN',
          bookmarks: [{ reportId: 'test-report-1', variantId: 'test-variant-1' }],
        },
      } as unknown as Response

      bookmarkService = {
        getAllBookmarks: jest.fn().mockReturnValueOnce([{ reportId: 'test-report-1', variantId: 'test-variant-1' }]),
        createBookMarkToggleHtml: jest.fn().mockReturnValueOnce('<p>Bookmark toggle</p>'),
        getState: jest.fn(),
      } as unknown as BookmarkService

      mockDefinition = {
        id: 'reportId',
        name: 'reportName',
        description: 'description',
        variant: variant1 as components['schemas']['VariantDefinition'],
      }

      reportingService = {
        getDefinition: jest.fn().mockReturnValueOnce(mockDefinition),
        getDefinitionSummary: jest.fn().mockReturnValueOnce({
          id: 'reportId',
          name: 'reportName',
          description: 'description',
          variants: [variant1],
        }),
      } as unknown as ReportingService

      dashboardService = {
        getDefinition: jest
          .fn()
          .mockReturnValueOnce(<components['schemas']['DashboardDefinition']>dashboardDefinitions.mockDashboards[0]),
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
      })

      expect(result.tableData.rows.length).toEqual(1)
      expect(result.tableData.rows[0][0].html).toContain('reportName')
      expect(result.tableData.rows[0][0].html).toContain('Successful Report')
      expect(result.tableData.rows[0][0].html).toContain('report')
      expect(result.tableData.rows[0][1].html).toContain('this will succeed')
      expect(result.tableData.rows[0][2].html).toContain('Bookmark toggle')
    })
  })
})
