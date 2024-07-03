/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportingService from '../services/reportingService'
import AsyncReportStoreService from '../services/requestedReportsService'
import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { setDataFromStatus, formatCardData } from './asyncReportsUtils'
import * as AsyncReportsUtils from './asyncReportsUtils'
import AsyncPollingUtils from '../components/async-polling/utils'
import * as PollingUtils from '../components/async-polling/utils'

describe('AsyncReportsListUtils', () => {
  describe('setDataFromStatus', () => {
    let reportData: AsyncReportData

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
      } as unknown as AsyncReportData
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
        href: 'requestUrl&retryId=executionId',
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
        href: 'requestUrl&retryId=executionId',
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

  describe('formatCards', () => {
    let mockAsyncReportsStore: AsyncReportStoreService
    let formatCardDataSpy: any

    beforeEach(() => {
      mockAsyncReportsStore = {
        getAllReports: jest.fn(() => {
          return Promise.resolve([
            { timestamp: { requested: 'requestedTs' } },
            { timestamp: { requested: 'requestedTs' } },
            { timestamp: { requested: 'requestedTs' } },
            { timestamp: { lastViewed: 'requestedTs' } },
            { timestamp: { retried: 'requestedTs' } },
          ])
        }),
      } as unknown as AsyncReportStoreService
      formatCardDataSpy = jest.spyOn(AsyncReportsUtils, 'formatCardData').mockImplementation()
    })

    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should filter out retried and last viewed items', async () => {
      await AsyncReportsUtils.formatCards(mockAsyncReportsStore, {} as unknown as ReportingService, '')
      expect(formatCardDataSpy).toHaveBeenCalledTimes(3)
    })
  })

  describe('formatCardData', () => {
    let reportData: AsyncReportData
    let getStatusSpy: any
    beforeEach(() => {
      reportData = {
        executionId: 'executionId',
        reportId: 'reportId',
        variantId: 'variantId',
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
        name: 'name',
        description: 'description',
        query: {
          summary: [{ name: 'name', value: 'value' }],
        },
        status: RequestStatus.SUBMITTED,
        timestamp: {
          requested: 'ts',
        },
      } as unknown as AsyncReportData

      getStatusSpy = jest.spyOn(AsyncPollingUtils, 'getStatus').mockResolvedValue({
        status: RequestStatus.FINISHED,
      })

      jest.spyOn(AsyncReportsUtils, 'setDataFromStatus').mockImplementation()
    })

    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should return the card data with SUCCESS status', async () => {
      const result = await formatCardData(
        reportData,
        {} as unknown as ReportingService,
        '',
        {} as unknown as AsyncReportStoreService,
      )

      const expectedResult = {
        id: 'executionId',
        text: 'name',
        description: 'description',
        tag: 'MIS',
        summary: [{ name: 'name', value: 'value' }],
        status: 'FINISHED',
      }

      expect(result).toEqual(expectedResult)
    })

    it('should return the card data with FAILED', async () => {
      jest.spyOn(PollingUtils, 'timeoutRequest').mockReturnValue(true)
      const result = await formatCardData(
        reportData,
        {} as unknown as ReportingService,
        '',
        {} as unknown as AsyncReportStoreService,
      )

      expect(getStatusSpy).not.toHaveBeenCalled()
      expect(result.status).toEqual(RequestStatus.FAILED)
    })

    it('should not call getStatus if status is FAILED', async () => {
      reportData.status = RequestStatus.FAILED
      const result = await formatCardData(
        reportData,
        {} as unknown as ReportingService,
        '',
        {} as unknown as AsyncReportStoreService,
      )

      expect(getStatusSpy).not.toHaveBeenCalled()
      expect(result.status).toEqual(RequestStatus.FAILED)
    })

    it('should not call getStatus if status is ABORTED', async () => {
      reportData.status = RequestStatus.ABORTED
      const result = await formatCardData(
        reportData,
        {} as unknown as ReportingService,
        '',
        {} as unknown as AsyncReportStoreService,
      )

      expect(getStatusSpy).not.toHaveBeenCalled()
      expect(result.status).toEqual(RequestStatus.ABORTED)
    })
  })
})
