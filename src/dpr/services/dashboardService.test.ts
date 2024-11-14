import DashboardService from './dashboardService'
import DashboardClient from '../data/dashboardClient'
import { DashboardDefinition } from '../types/Dashboards'
import { RequestStatus } from '../types/UserReports'

jest.mock('../data/dashboardClient')

describe('DashboardService', () => {
  let dashboardClient: jest.Mocked<DashboardClient>
  let dashboardService: DashboardService

  beforeEach(() => {
    dashboardClient = new DashboardClient(null) as jest.Mocked<DashboardClient>
    dashboardService = new DashboardService(dashboardClient)
  })

  describe('getDefinition', () => {
    it('Retrieves a definition from client', async () => {
      const expectedResponse: DashboardDefinition = {
        id: 'test-dashboard-1',
        name: 'Test Dashboard 1',
        description: 'Test Dashboard 1 Description',
        metrics: [
          {
            id: 'test-metric-id-1',
          },
        ],
      }

      dashboardClient.getDefinition.mockResolvedValue(expectedResponse)

      const result = await dashboardService.getDefinition('token', 'test-metric-id-1', 'pdp-id')

      expect(result).toEqual(expectedResponse)
    })
  })

  describe('requestAsyncDashboard', () => {
    it('should request an async dashboard', async () => {
      dashboardClient.requestAsyncDashboard.mockResolvedValue({
        executionId: 'executionId',
        tableId: 'executiotableIdId',
      })

      const result = await dashboardService.requestAsyncDashboard('token', 'dashboard-1', 'reportid', {
        dataProductDefinitionsPath: 'dataProductDefinitionsPath',
      })

      expect(result).toEqual({
        executionId: 'executionId',
        tableId: 'executiotableIdId',
      })
    })
  })

  describe('cancelAsyncRequest', () => {
    it('should cancel the async request', async () => {
      dashboardClient.cancelAsyncRequest.mockResolvedValue({
        cancellationSucceeded: 'true',
      })

      const result = await dashboardService.cancelAsyncRequest('token', 'dashboard-1', 'reportid', 'executionId')

      expect(result).toEqual({
        cancellationSucceeded: 'true',
      })
    })
  })

  describe('getAsyncStatus', () => {
    it('should get the status', async () => {
      dashboardClient.getAsyncStatus.mockResolvedValue({
        status: RequestStatus.FAILED,
      })

      const result = await dashboardService.getAsyncStatus(
        'token',
        'reportid',
        'dashboard-1',
        'executionId',
        'dataProductDefinitionsPath',
      )

      expect(result).toEqual({
        status: RequestStatus.FAILED,
      })
    })
  })

  describe('getAsyncDashboard', () => {
    it('Retrieves a count', async () => {
      dashboardClient.getAsyncDashboard.mockResolvedValue([{ test: 'test ' }])

      const result = await dashboardService.getAsyncDashboard(null, 'dashboard-id', 'report-id', 'table-id', {})

      expect(result).toEqual([{ test: 'test ' }])
    })
  })
})
