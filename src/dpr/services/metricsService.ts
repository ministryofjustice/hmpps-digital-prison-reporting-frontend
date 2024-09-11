/* eslint-disable @typescript-eslint/no-explicit-any */

import { MetricsDataResponse, MetricsDefinition } from '../types/Metrics'

export default class MetricService {
  constructor(private readonly metricClient: any) {}

  async getDefinitions(token: string, dataProductDefinitionsPath?: string): Promise<Array<MetricsDefinition>> {
    return this.metricClient.getDefinitions(token, dataProductDefinitionsPath)
  }

  async getDefinition(
    token: string,
    metricId: string,
    dpdId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<MetricsDefinition> {
    return this.metricClient.getDefinition(token, metricId, dataProductDefinitionsPath)
  }

  async getMetricData(token: string, metricId: string, dpdId: string): Promise<MetricsDataResponse> {
    return this.metricClient.getMetricData(token, metricId, dpdId)
  }
}
