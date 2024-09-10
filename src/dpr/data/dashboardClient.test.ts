import nock from 'nock'

import DashboardClient from './dashboardClient'
import AgentConfig from './agentConfig'
import { DashboardDefinition } from '../types/Dashboards'
import { ChartType } from '../types/Charts'

describe('dashboardClient', () => {
  let fakeReportingApi: nock.Scope
  let dashboardClient: DashboardClient

  beforeEach(() => {
    const url = 'http://localhost:3010/dashboards'
    fakeReportingApi = nock(url)
    dashboardClient = new DashboardClient({
      url,
      agent: new AgentConfig(),
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getDefinitions', () => {
    it('should return definitions from api', async () => {
      const response: Array<DashboardDefinition> = [
        {
          id: 'test-dashboard-1',
          name: 'Test Dashboard 1',
          description: 'Test Dashboard 1 Description',
          metrics: [
            {
              id: 'test-metric-id-1',
              visualisationType: [ChartType.BAR, ChartType.DONUT],
            },
          ],
        },
      ]
      const query = {}

      fakeReportingApi.get(`/definitions/dashboards`).query(query).reply(200, response)

      const output = await dashboardClient.getDefinitions(null)
      expect(output).toEqual(response)
    })

    it('should return definitions from api with definitions path', async () => {
      const response: Array<DashboardDefinition> = [
        {
          id: 'test-dashboard-1',
          name: 'Test Dashboard 1',
          description: 'Test Dashboard 1 Description',
          metrics: [
            {
              id: 'test-metric-id-1',
              visualisationType: [ChartType.BAR, ChartType.DONUT],
            },
          ],
        },
      ]
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions/dashboards`).query(query).reply(200, response)

      const output = await dashboardClient.getDefinitions(null, 'test-definition-path')
      expect(output).toEqual(response)
    })
  })

  describe('getDefinition', () => {
    it('should return definition from api', async () => {
      const response: DashboardDefinition = {
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

      fakeReportingApi.get(`/definitions/dashboards/test-dashboard`).reply(200, response)

      const output = await dashboardClient.getDefinition(null, 'test-dashboard')
      expect(output).toEqual(response)
    })

    it('should return definition from api with definitions path', async () => {
      const response: DashboardDefinition = {
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
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions/dashboards/test-dashboard`).query(query).reply(200, response)

      const output = await dashboardClient.getDefinition(null, 'test-dashboard', 'test-definition-path')
      expect(output).toEqual(response)
    })
  })
})
