/* eslint-disable @typescript-eslint/no-explicit-any */

export default class MetricService {
  constructor(private readonly metricClient: any) {}

  async getMetricData(token: string, metricId: string) {
    return this.metricClient.getMetricData(token, metricId)
  }
}
