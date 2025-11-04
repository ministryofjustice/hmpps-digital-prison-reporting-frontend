import { Response } from 'express'
import CatalogueUtils from './utils'
import { Services } from '../../../types/Services'
import { BookmarkService } from '../../../services'
import ListDefinitions from '../../../../../test-app/mocks/mockClients/reports/mockReportDefinition'

describe('CatalogueUtils', () => {
  let services: Services
  let res: Response

  beforeEach(() => {
    res = {
      locals: {
        dprUser: {
          id: 'UsErId',
        },
        csfrToken: 'CsRfToKeN',
        definitions: ListDefinitions.reports,
      },
    } as unknown as Response

    services = {
      bookmarkService: { createBookMarkToggleHtml: jest.fn(), getState: jest.fn() } as unknown as BookmarkService,
    } as unknown as Services
  })

  describe('getReportsList', () => {
    it('should map the reports to the list', async () => {
      const reportsTableData = await CatalogueUtils.getReportsList(res, services)

      expect(reportsTableData.head.length).toEqual(4)
      expect(reportsTableData.rows.length).toEqual(71)
    })
  })
})
