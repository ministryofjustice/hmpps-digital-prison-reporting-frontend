const mockRequestedV1 = require('./mockRequestedUserListDataV1')
const mockViewedV1 = require('./mockViewedUserListDataV1')

// TODO: integration tests with this mocked data also
// const mockRequestedV2 = require('./mockRequestedUserListDataV2')
const mockViewedV2 = require('./mockViewedUserListDataV2')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [
        mockRequestedV1.requestedReady,
        mockRequestedV1.requestedFailed,
        mockRequestedV1.requestedExpired,
        mockRequestedV1.requestedAborted,
        mockViewedV1.viewedReady,
      ],
      recentlyViewedReports: [mockViewedV2.viewedDashboard, mockViewedV1.viewedReady, mockViewedV1.viewedExpired],
      bookmarks: [
        { reportId: 'test-report-3', variantId: 'variantId-1' },
        { reportId: 'test-report-1', id: 'test-dashboard-8', type: 'dashboard' },
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
