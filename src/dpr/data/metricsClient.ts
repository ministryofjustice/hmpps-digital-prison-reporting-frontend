import logger from '../utils/logger'
import RestClient from './restClient'
import { ApiConfig } from './types'
import Dict = NodeJS.Dict
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

  getDefinition(token: string, metricId: string, dpdId: string, definitionsPath?: string): Promise<MetricsDefinition> {
    logger.info(`Mertrics client: Get definition:${metricId}`)

    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }
    return this.restClient
      .get({
        path: `/definitions/${dpdId}/metrics/${metricId}`,
        query,
        token,
      })
      .then((response) => <MetricsDefinition>response)
  }

  getMetricData(token: string, metricId: string, dpdId: string): Promise<MetricsDataResponse> {
    logger.info(`Metrics client: Get metricId:${metricId} data`)

    return this.restClient
      .get({
        path: `/reports/${dpdId}/metrics/${metricId}`,
        token,
      })
      .then((response) => <MetricsDataResponse>response)
  }

  getMetricDataAsync(
    token: string,
    reportId: string,
    metricId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    logger.info(`Metrics client: request ${reportId} : ${metricId}`)

    return this.restClient
      .get({
        path: `/async/reports/${reportId}/metrics/${metricId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }

  getDashboardMetricDataAsync(
    token: string,
    reportId: string,
    dashboardId: string,
    metricId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    logger.info(`Metrics client: request ${reportId} : ${metricId}`)

    return this.restClient
      .get({
        path: `/async/reports/${reportId}/dashboard/${dashboardId}/metrics/${metricId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }
}
