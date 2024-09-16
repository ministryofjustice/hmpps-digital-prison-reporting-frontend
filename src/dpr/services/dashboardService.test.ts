import DashboardService from './dashboardService'
import DashboardClient from '../data/dashboardClient'
import { ChartType } from '../types/Charts'
import { DashboardDefinition } from '../types/Dashboards'

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
            visualisationType: [ChartType.BAR, ChartType.DONUT],
          },
        ],
      }

      dashboardClient.getDefinition.mockResolvedValue(expectedResponse)

      const result = await dashboardService.getDefinition('token', 'test-metric-id-1', 'pdp-id')

      expect(result).toEqual(expectedResponse)
    })
  })
})
