// TODO: integration tests with this mocked data also
const mockRequested = require('./mockRequestedUserListData')
const mockViewed = require('./mockViewedUserListData')
const mockRequestedDashboards = require('./mockRequestedDashboardData')

export const startData = {
  requestedReports: [
    // mockRequested.requestedReady,
    // mockRequested.requestedExpired,
    // mockRequested.requestedFailed,
    // mockRequested.requestedAborted,
    // Dashboards
    // mockRequestedDashboards.readyDashboard,
    // mockRequestedDashboards.failedDashboard,
    // mockRequestedDashboards.expiredDashboard,
    // mockRequestedDashboards.abortedDashboard,
    // Viewed must be present in the request list also
    // mockViewed.viewedReady,
    // mockViewed.viewedDashboard,
    // mockViewed.viewedInteractive,
    // mockViewed.viewedInteractiveAsync,
  ],
  recentlyViewedReports: [
    // mockViewed.viewedDashboard,
    // mockViewed.viewedReady,
    // mockViewed.viewedInteractive,
    // mockViewed.viewedExpired,
    // mockViewed.expiredDashboard,
    // mockViewed.viewedInteractiveAsync,
  ],
  bookmarks: [
    { reportId: 'request-examples', variantId: 'request-example-success' },
    { reportId: 'mock-dashboards', id: 'test-dashboard-8', type: 'dashboard' },
  ],
  downloads: [],
}

export const MockUserStoreService = class MockUserStoreService {
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
