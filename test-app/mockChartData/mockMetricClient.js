class MockMetricClient {
  constructor(mockMetricData) {
    this.mockMetricData = mockMetricData
  }

  async getMetricData(token, metricId) {
    return Promise.resolve(this.mockMetricData.find((metric) => metric.id === metricId))
  }
}

module.exports = MockMetricClient
