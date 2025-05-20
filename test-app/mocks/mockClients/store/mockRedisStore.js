// TODO: integration tests with this mocked data also
const mockRequestedV2 = require('./mockRequestedUserListDataV2')
const mockViewedV2 = require('./mockViewedUserListDataV2')
const mockRequestedDashboards = require('./mockRequestedDashboardData')

const startData = {
  requestedReports: [
    mockRequestedV2.requestedReady,
    mockRequestedV2.requestedExpired,
    mockRequestedV2.requestedFailed,
    mockRequestedV2.requestedAborted,
    // Dashboards
    mockRequestedDashboards.readyDashboard,
    mockRequestedDashboards.failedDashboard,
    mockRequestedDashboards.expiredDashboard,
    mockRequestedDashboards.abortedDashboard,
    // Viewed must be present in the request list also
    mockViewedV2.viewedReady,
    mockViewedV2.viewedDashboard,
    mockViewedV2.viewedInteractive,
  ],
  recentlyViewedReports: [
    mockViewedV2.viewedDashboard,
    mockViewedV2.viewedReady,
    mockViewedV2.viewedInteractive,
    mockViewedV2.viewedExpired,
    mockViewedV2.expiredDashboard,
  ],
  bookmarks: [
    // { reportId: 'test-report-3', variantId: 'variantId-1' },
    // { reportId: 'test-report-1', id: 'test-dashboard-8', type: 'dashboard' },
  ],
  downloads: [],
}

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify(startData)
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
