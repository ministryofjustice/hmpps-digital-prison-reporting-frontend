const mockRequestedV1 = require('./mockRequestedUserListDataV1')
const mockViewedV1 = require('./mockViewedUserListDataV1')

// TODO: integration tests with this mocked data also
const mockRequestedV2 = require('./mockRequestedUserListDataV2')
const mockViewedV2 = require('./mockViewedUserListDataV2')
const mockRequestedDashboards = require('./mockRequestedDashboardData')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [
        mockRequestedV1.requestedReady,
        mockRequestedV1.requestedFailed,
        mockRequestedV1.requestedExpired,
        mockRequestedV1.requestedAborted,

        // V2 schema
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
        mockViewedV1.viewedReady,
        mockViewedV2.viewedReady,
        mockViewedV2.viewedDashboard,
        mockViewedV2.viewedInteractive,
      ],
      recentlyViewedReports: [
        mockViewedV2.viewedDashboard,
        mockViewedV1.viewedReady,
        mockViewedV2.viewedReady,
        mockViewedV2.viewedInteractive,
        mockViewedV1.viewedExpired,
        mockViewedV2.viewedExpired,
        mockViewedV2.expiredDashboard,
      ],
      bookmarks: [
        { reportId: 'test-report-3', variantId: 'variantId-1' },
        { reportId: 'test-report-1', id: 'test-dashboard-8', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'list-examples-data-quality-dataset', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'list-examples-diet-totals-full-set', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'list-examples-diet-totals', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'data-quality-dashboard-base', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'list-examples-fallback-keys', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'age-breakdown-dashboard-2', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'age-breakdown-dashboard-1', type: 'dashboard' },
        // { reportId: 'test-report-1', id: 'chart-examples-diet-totals-flexible', type: 'dashboard' },
      ],
      downloads: [],
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
