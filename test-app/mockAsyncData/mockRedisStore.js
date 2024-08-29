const mockData = require('./mockRedisReportData')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [
        mockData.mockRequestedReports[0],
        mockData.mockRequestedReports[1],
        mockData.mockRequestedReports[2],
      ],
      recentlyViewedReports: [mockData.mockViewedReports[0], mockData.mockViewedReports[1]],
      bookmarks: [
        { reportId: 'test-report-1', variantId: 'variantId-1' },
        { reportId: 'test-report-2', variantId: 'variantId-16' },
      ],
    })
  }

  async setUserConfig(key, config) {
    this.userStore = JSON.stringify(config)
    return Promise.resolve()
  }

  async getUserConfig() {
    return Promise.resolve(JSON.parse(this.userStore))
  }
}

module.exports = MockUserStoreService
