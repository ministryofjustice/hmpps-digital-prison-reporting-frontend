import logger from '../utils/logger'
import RestClient from './restClient'
import { ApiConfig } from './types'
import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'

export default class MetricsClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Metric API Client', config)
  }

  getDefinitions(token: string, definitionsPath?: string): Promise<Array<MetricsDefinition>> {
    logger.info(`Mertrics client: Get definitions`)

    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }

    return this.restClient
      .get({
        path: '/definitions/metrics',
        query,
        token,
      })
      .then((response) => <Array<MetricsDefinition>>response)
  }

  getDefinition(token: string, metricId: string, definitionsPath?: string): Promise<MetricsDefinition> {
    logger.info(`Mertrics client: Get definition:${metricId}`)

    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }
    return this.restClient
      .get({
        path: `/definitions/metrics/${metricId}`,
        query,
        token,
      })
      .then((response) => <MetricsDefinition>response)
  }

  getMetricData(token: string, metricId: string): Promise<MetricsDataResponse> {
    logger.info(`Metrics client: Get metricId:${metricId} data`)

    return this.restClient
      .get({
        path: `/metrics/${metricId}`,
        token,
      })
      .then((response) => <MetricsDataResponse>response)
  }
}
