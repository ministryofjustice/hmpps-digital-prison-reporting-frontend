const mockRedisRequestedReports = require('./mockRedisRequestedReports')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [],
      recentlyViewedReports: [],
      bookmarks: [],
    })
  }

  async setUserConfig (key, config) {
    this.userStore = JSON.stringify(config)
    return Promise.resolve()
  }

  async getUserConfig (key) {
    return Promise.resolve(JSON.parse(this.userStore))
  }
}

module.exports = MockUserStoreService
