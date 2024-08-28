const mockData = require('./mockRedisReportData')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [mockData.mockRequestedReports[0]],
      recentlyViewedReports: [mockData.mockViewedReports[0]],
      bookmarks: [],
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
