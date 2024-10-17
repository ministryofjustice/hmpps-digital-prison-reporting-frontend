/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestedReport, RequestStatus } from '../../types/UserReports'
import { setDataFromStatus } from './utils'

describe('AsyncRequestListUtils', () => {
  describe('setDataFromStatus', () => {
    let reportData: RequestedReport

    beforeEach(() => {
      reportData = {
        executionId: 'executionId',
        url: {
          request: { fullUrl: 'requestUrl' },
          report: { fullUrl: 'reportUrl' },
          polling: { fullUrl: 'pollingUrl' },
        },
        timestamp: {
          failed: 'ts',
          aborted: 'ts',
          completed: 'ts',
          expired: 'ts',
          requested: 'ts',
          lastViewed: 'ts',
        },
      } as unknown as RequestedReport
    })

    it('should set the correct href and timestamp for FAILED status', async () => {
      const result = setDataFromStatus(RequestStatus.FAILED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Failed at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FAILED status', async () => {
      const result = setDataFromStatus(RequestStatus.FAILED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Failed at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for ABORTED status', async () => {
      const result = setDataFromStatus(RequestStatus.ABORTED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Aborted at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for FINISHED status', async () => {
      const result = setDataFromStatus(RequestStatus.FINISHED, reportData)
      const expectedResult = {
        href: 'reportUrl',
        timestamp: 'Ready at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for EXPIRED status', async () => {
      const result = setDataFromStatus(RequestStatus.EXPIRED, reportData)
      const expectedResult = {
        href: 'requestUrl',
        timestamp: 'Expired at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for SUBMITTED status', async () => {
      const result = setDataFromStatus(RequestStatus.SUBMITTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for STARTED status', async () => {
      const result = setDataFromStatus(RequestStatus.STARTED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })

    it('should set the correct href and timestamp for PICKED status', async () => {
      const result = setDataFromStatus(RequestStatus.PICKED, reportData)
      const expectedResult = {
        href: 'pollingUrl',
        timestamp: 'Requested at: Invalid Date',
      }
      expect(result).toEqual(expectedResult)
    })
  })
})
