import nock from 'nock'

import DashboardClient from './dashboardClient'
import AgentConfig from './agentConfig'
import { DashboardDefinition } from '../types/Dashboards'

describe('dashboardClient', () => {
  let fakeDashboardApi: nock.Scope
  let dashboardClient: DashboardClient

  beforeEach(() => {
    const url = 'http://localhost:3010'
    fakeDashboardApi = nock(url)
    dashboardClient = new DashboardClient({
      url,
      agent: new AgentConfig(),
    })
  })

  afterEach(() => {
    nock.cleanAll()
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
          },
        ],
      }

      fakeDashboardApi.get(`/definitions/dpd-id/dashboards/test-dashboard`).reply(200, response)

      const output = await dashboardClient.getDefinition(null, 'test-dashboard', 'dpd-id')
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
          },
        ],
      }
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeDashboardApi.get(`/definitions/dpd-id/dashboards/test-dashboard`).query(query).reply(200, response)

      const output = await dashboardClient.getDefinition(null, 'test-dashboard', 'dpd-id', 'test-definition-path')
      expect(output).toEqual(response)
    })
  })

  describe('requestAsyncDashboard', () => {
    it('should request an async dashboard', async () => {
      fakeDashboardApi.get(`/async/dashboards/dpd-id/test-dashboard-id`).reply(200, {
        executionId: 'exId',
        tableId: 'tbId',
      })

      const output = await dashboardClient.requestAsyncDashboard(null, 'dpd-id', 'test-dashboard-id', {})
      expect(output).toEqual({
        executionId: 'exId',
        tableId: 'tbId',
      })
    })
  })

  describe('getAsyncStatus', () => {
    it('should request an async dashboard', async () => {
      fakeDashboardApi.get(`/reports/dpd-id/dashboards/test-dashboard-id/statements/exId/status`).reply(200, {
        status: 'SUBMITTED',
      })

      const output = await dashboardClient.getAsyncStatus(null, 'dpd-id', 'test-dashboard-id', 'exId')
      expect(output).toEqual({
        status: 'SUBMITTED',
      })
    })
  })

  describe('cancelAsyncRequest', () => {
    it('should request an async dashboard', async () => {
      fakeDashboardApi.delete(`/reports/dpd-id/dashboards/test-dashboard-id/statements/exId`).reply(200, {
        cancellationSucceeded: 'true',
      })

      const output = await dashboardClient.cancelAsyncRequest(null, 'dpd-id', 'test-dashboard-id', 'exId')
      expect(output).toEqual({
        cancellationSucceeded: 'true',
      })
    })
  })

  describe('getAsyncDashboard', () => {
    it('should return data from api', async () => {
      const response = [{ test: 'true' }]
      const expectedQuery: Record<string, string> = {
        dataProductDefinitionsPath: 'test-definition-path',
      }
      const reportId = 'report-id'
      const dashboardId = 'dashboard-id'
      const tableId = 'table-id'

      fakeDashboardApi
        .get(`/reports/${reportId}/dashboards/${dashboardId}/tables/${tableId}/result`)
        .query(expectedQuery)
        .reply(200, response)

      const output = await dashboardClient.getAsyncDashboard(null, reportId, dashboardId, tableId, expectedQuery)
      expect(output).toEqual(response)
    })
  })
})
