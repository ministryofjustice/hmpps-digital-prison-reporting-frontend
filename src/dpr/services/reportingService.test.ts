import ReportingClient from '../data/reportingClient'
import { components } from '../types/api'
import ReportingService from './reportingService'
import Dict = NodeJS.Dict

jest.mock('../data/reportingClient')

describe('Reporting service', () => {
  let reportingClient: jest.Mocked<ReportingClient>
  let reportingService: ReportingService

  beforeEach(() => {
    reportingClient = new ReportingClient(null) as jest.Mocked<ReportingClient>
    reportingService = new ReportingService(reportingClient)
  })

  describe('getCount', () => {
    it('Retrieves count from client', async () => {
      const expectedCount = 456
      reportingClient.getCount.mockResolvedValue(expectedCount)

      const result = await reportingService.getCount(null, null, null)

      expect(result).toEqual(expectedCount)
    })
  })

  describe('getList', () => {
    it('Retrieves list from client', async () => {
      const expectedResponse: Array<Dict<string>> = [{ test: 'true' }]
      reportingClient.getList.mockResolvedValue(expectedResponse)

      const result = await reportingService.getList(null, null, null)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getDefinitions', () => {
    it('Retrieves definitions from client', async () => {
      const expectedResponse: Array<components['schemas']['ReportDefinitionSummary']> = [
        {
          id: 'test-report',
          name: 'Test report',
          variants: [],
          authorised: false,
        },
      ]
      reportingClient.getDefinitions.mockResolvedValue(expectedResponse)

      const result = await reportingService.getDefinitions(null)

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getDefinition', () => {
    it('Retrieves a definition from the client', async () => {
      const expectedResponse: components['schemas']['SingleVariantReportDefinition'] = {
        id: 'test-report',
        name: 'Test report',
        variant: {
          id: 'test-variant',
          name: 'Test variant',
          resourceName: 'reports/test/test',
          classification: 'OFFICIAL',
          printable: false,
        } as unknown as components['schemas']['VariantDefinition'],
      }

      reportingClient.getDefinition.mockResolvedValue(expectedResponse)

      const result = await reportingService.getDefinition(null, 'test-report', 'test-variant')

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('requestAsyncReport', () => {
    it('Retrieves a definition from the client', async () => {
      reportingClient.requestAsyncReport.mockResolvedValue({ executionId: 'executionId', tableId: 'tableId' })

      const result = await reportingService.requestAsyncReport(null, 'test-report', 'test-variant', {})

      expect(result).toEqual({ executionId: 'executionId', tableId: 'tableId' })
    })
  })

  describe('cancelAsyncRequest', () => {
    it('cancels the async request', async () => {
      reportingClient.cancelAsyncRequest.mockResolvedValue({ cancellationSucceeded: 'true' })

      const result = await reportingService.cancelAsyncRequest(null, 'test-report', 'test-variant', 'execution-id')

      expect(result).toEqual({ cancellationSucceeded: 'true' })
    })
  })

  describe('getAsyncReportStatus', () => {
    it('Retrieves the async status', async () => {
      reportingClient.getAsyncReportStatus.mockResolvedValue({ status: 'SUBMITTED' })

      const result = await reportingService.getAsyncReportStatus(
        null,
        'test-report',
        'test-variant',
        'execution-id',
        '',
      )

      expect(result).toEqual({ status: 'SUBMITTED' })
    })
  })

  describe('getAsyncCount', () => {
    it('Retrieves a count', async () => {
      reportingClient.getAsyncCount.mockResolvedValue(234234)

      const result = await reportingService.getAsyncCount(null, 'table-id')

      expect(result).toEqual(234234)
    })
  })

  describe('getAsyncReport', () => {
    it('Retrieves a count', async () => {
      reportingClient.getAsyncReport.mockResolvedValue([{ test: 'test ' }])

      const result = await reportingService.getAsyncReport(null, 'report-id', 'variant-id', 'table-id', {})

      expect(result).toEqual([{ test: 'test ' }])
    })
  })

  describe('getAsyncSummaryReport', () => {
    it('Retrieves a count', async () => {
      reportingClient.getAsyncSummaryReport.mockResolvedValue([{ test: 'test ' }])

      const result = await reportingService.getAsyncSummaryReport(
        null,
        'report-id',
        'variant-id',
        'table-id',
        'summary-id',
        {},
      )

      expect(result).toEqual([{ test: 'test ' }])
    })
  })
})
