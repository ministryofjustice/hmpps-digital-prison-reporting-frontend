const mockMetricData = require('./mockMetricData')
const mockMetricDefinitions = require('./mockMetricDefinition')

class MockMetricClient {
  constructor() {
    this.mockMetricDefinitions = mockMetricDefinitions
    this.mockMetricData = mockMetricData
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
      }, 5000)
    })
  }
}

module.exports = MockMetricClient
