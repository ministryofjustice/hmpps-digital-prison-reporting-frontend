/* eslint-disable @typescript-eslint/no-explicit-any */

export default class MetricService {
  // TODO: use correct client type, once implemented. Currently using a mocked client
  constructor(private readonly metricClient: any) {}

  async getMetricData(token: string, metricId: string) {
    return this.metricClient.getMetricData(token, metricId)
  }
}
