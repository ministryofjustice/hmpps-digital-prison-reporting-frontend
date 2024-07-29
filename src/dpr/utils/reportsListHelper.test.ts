import * as ReportsListHelper from './reportsListHelper'
import { filterReports, formatCardData } from '../components/async-request-list/utils'
import mockRedisData from '../../../test-app/mockAsyncData/mockRedisReportData'
import { AsyncReportData } from '../types/AsyncReport'

describe('ReportsListHelper', () => {
  describe('formatCards', () => {
    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should filter out last viewed items for requested reports', async () => {
      const result = await ReportsListHelper.formatCards(
        mockRedisData.mockRequestedReports as AsyncReportData[],
        filterReports,
        formatCardData,
      )

      expect(result.length).toEqual(2)
    })
  })
})
