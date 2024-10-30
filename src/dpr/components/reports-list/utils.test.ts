import { Response } from 'express'
import ReportListUtils from './utils'
import { Services } from '../../types/Services'
import BookmarkService from '../../services/bookmarkService'
import ListDefinitions from '../../../../test-app/mocks/mockClients/reports/mockReportDefinition'

describe('ReportListUtils', () => {
  let services: Services
  let res: Response

  beforeEach(() => {
    res = {
      locals: {
        user: {
          uuid: 'UsErId',
        },
        csfrToken: 'CsRfToKeN',
        definitions: ListDefinitions.reports,
      },
    } as unknown as Response

    services = {
      bookmarkService: { createBookMarkToggleHtml: jest.fn() } as unknown as BookmarkService,
    } as unknown as Services
  })

  describe('mapReportsList', () => {
    it('should map the reports to the list', async () => {
      const reportsTableData = await ReportListUtils.mapReportsList(res, services)

      expect(reportsTableData.head.length).toEqual(5)
      expect(reportsTableData.rows.length).toEqual(40)
    })
  })
})
