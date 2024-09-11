import nock from 'nock'

import MetricsClient from './metricsClient'
import AgentConfig from './agentConfig'
import { MetricsDefinition } from '../types/Metrics'
import { ChartType } from '../types/Charts'

describe('metricsClient', () => {
  let fakeReportingApi: nock.Scope
  let metricsClient: MetricsClient

  beforeEach(() => {
    const url = 'http://localhost:3010/metrics'
    fakeReportingApi = nock(url)
    metricsClient = new MetricsClient({
      url,
      agent: new AgentConfig(),
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getDefinitions', () => {
    it('should return definitions from api', async () => {
      const response: Array<MetricsDefinition> = [
        {
          id: 'test-metric-id-1',
          name: 'testMetricId1',
          display: 'Prisoner Images by Status Percentage',
          description: 'Prisoner Images by Status Percentage',
          visualisationType: [ChartType.BAR, ChartType.DONUT],
          specification: [
            {
              name: 'status',
              display: 'Status',
            },
            {
              name: 'count',
              display: 'Count',
            },
          ],
        },
      ]
      const query = {}

      fakeReportingApi.get(`/definitions/metrics`).query(query).reply(200, response)

      const output = await metricsClient.getDefinitions(null)
      expect(output).toEqual(response)
    })

    it('should return definitions from api with definitions path', async () => {
      const response: Array<MetricsDefinition> = [
        {
          id: 'test-metric-id-1',
          name: 'testMetricId1',
          display: 'Prisoner Images by Status Percentage',
          description: 'Prisoner Images by Status Percentage',
          visualisationType: [ChartType.BAR, ChartType.DONUT],
          specification: [
            {
              name: 'status',
              display: 'Status',
            },
            {
              name: 'count',
              display: 'Count',
            },
          ],
        },
      ]
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions/metrics`).query(query).reply(200, response)

      const output = await metricsClient.getDefinitions(null, 'test-definition-path')
      expect(output).toEqual(response)
    })
  })

  describe('getDefinition', () => {
    it('should return definition from api', async () => {
      const response: MetricsDefinition = {
        id: 'test-metric-id-1',
        name: 'testMetricId1',
        display: 'Prisoner Images by Status Percentage',
        description: 'Prisoner Images by Status Percentage',
        visualisationType: [ChartType.BAR, ChartType.DONUT],
        specification: [
          {
            name: 'status',
            display: 'Status',
          },
          {
            name: 'count',
            display: 'Count',
          },
        ],
      }

      fakeReportingApi.get(`/definitions/dpd-id/metrics/test-metric`).reply(200, response)

      const output = await metricsClient.getDefinition(null, 'test-metric', 'dpd-id')
      expect(output).toEqual(response)
    })

    it('should return definition from api with definitions path', async () => {
      const response: MetricsDefinition = {
        id: 'test-metric-id-1',
        name: 'testMetricId1',
        display: 'Prisoner Images by Status Percentage',
        description: 'Prisoner Images by Status Percentage',
        visualisationType: [ChartType.BAR, ChartType.DONUT],
        specification: [
          {
            name: 'status',
            display: 'Status',
          },
          {
            name: 'count',
            display: 'Count',
          },
        ],
      }
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions/dpd-id/metrics/test-metric`).query(query).reply(200, response)

      const output = await metricsClient.getDefinition(null, 'test-metric', 'dpd-id', 'test-definition-path')
      expect(output).toEqual(response)
    })
  })

  describe('getMetricData', () => {
    it('should return data from api', async () => {
      const response = [{ test: 'true' }]
      const metricId = 'metric-id'
      const dpdId = 'dpd-id'
      fakeReportingApi.get(`reports/${dpdId}/metrics/${metricId}`).reply(200, response)

      const output = await metricsClient.getMetricData(null, metricId, dpdId)
      expect(output).toEqual(response)
    })
  })
})
