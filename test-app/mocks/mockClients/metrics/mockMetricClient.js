const mockMetricData = require('./mockMetricData')
const mockMetricDefinitions = require('./mockMetricDefinition')
const mockMetricAsyncRequestResponses = require('./mockMetricAsyncRequest')

class MockMetricClient {
  constructor() {
    this.mockMetricDefinitions = mockMetricDefinitions
    this.mockMetricData = mockMetricData
    this.mockMetricAsyncRequestData = mockMetricAsyncRequestResponses
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDefinition(token, id, dpdId, dataProductDefinitionsPath) {
    return Promise.resolve(this.mockMetricDefinitions.find((d) => d.id === id))
  }

  async getDefinitions(token, dataProductDefinitionsPath) {
    Promise.resolve(this.mockMetricDefinitions)
  }

  async getMetricData(token, metricId, dpdId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockMetricData[metricId])
      }, 3000)
    })
  }

  async getMetricDataAsync(token, metricId, dpdId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockMetricAsyncRequestData.find((res) => res.id === metricId))
      }, 3000)
    })
  }
}

module.exports = MockMetricClient
