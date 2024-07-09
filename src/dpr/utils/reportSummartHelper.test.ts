import { AsyncReportData } from '../types/AsyncReport'
import * as ReportSummaryHelper from './reportSummaryHelper'

describe('ReportSummaryHelper', () => {
  describe('getDuplicateRequestIds', () => {
    it('should find a duplicate entry with same query params', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'

      const newParams = matchingParams
      const existingParams: AsyncReportData[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as AsyncReportData,
      ]

      const result = ReportSummaryHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1'])
    })

    it('should find multiple duplicate entries with same query params', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'

      const newParams = matchingParams
      const existingParams: AsyncReportData[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as AsyncReportData,
        {
          executionId: 'exexutionId2',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as AsyncReportData,
      ]

      const result = ReportSummaryHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1', 'exexutionId2'])
    })

    it('should find a duplicate entry with same query params when order is different', () => {
      const matchingParams = '?paramOne=red&paramThree=yellow&paramTwo.thing=blue'

      const newParams = matchingParams
      const existingParams: AsyncReportData[] = [
        {
          executionId: 'exexutionId1',
          url: {
            request: {
              search: matchingParams,
            },
          },
        } as unknown as AsyncReportData,
      ]

      const result = ReportSummaryHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual(['exexutionId1'])
    })

    it('should not find duplicate entries with same query params due to length', () => {
      const newQParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'
      const existingQParams = '?paramOne=red&paramTwo.thing=blue&paramThree=black'

      const newParams = newQParams
      const existingParams: AsyncReportData[] = [
        {
          exexutionId: 'exexutionId1',
          url: {
            request: {
              search: existingQParams,
            },
          },
        } as unknown as AsyncReportData,
      ]

      const result = ReportSummaryHelper.getDuplicateRequestIds(newParams, existingParams)

      expect(result).toEqual([])
    })

    it('should not find duplicate entries with same query params due to length', () => {
      const matchingParams = '?paramOne=red&paramTwo.thing=blue&paramThree=yellow'
      const existingParams: AsyncReportData[] = [
        {
          exexutionId: 'exexutionId1',
          url: {
            request: {
              search: `${matchingParams}&extraParam=black`,
            },
          },
        } as unknown as AsyncReportData,
      ]

      const result = ReportSummaryHelper.getDuplicateRequestIds(matchingParams, existingParams)

      expect(result).toEqual([])
    })
  })
})
