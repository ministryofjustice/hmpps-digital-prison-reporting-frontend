const mockDataV1 = require('./mockUserListDataV1')
const mockDataV2 = require('./mockUserListDataV2')

const MockUserStoreService = class MockUserStoreService {
  constructor() {
    this.userStore = JSON.stringify({
      requestedReports: [
        mockDataV1.mockRequestedReports[0],
        mockDataV1.mockRequestedReports[1],
        mockDataV1.mockRequestedReports[2],
        mockDataV1.mockRequestedReports[3],
        mockDataV1.mockRequestedReports[4],
        mockDataV2.mockRequestedReports[0],
        mockDataV2.mockRequestedReports[1],
        mockDataV2.mockRequestedReports[2],
        mockDataV2.mockRequestedDashboards[0],
        mockDataV2.mockRequestedDashboards[1],
        mockDataV2.mockRequestedDashboards[2],
      ],
      recentlyViewedReports: [mockDataV1.mockViewedReports[0], mockDataV1.mockViewedReports[1]],
      bookmarks: [{ reportId: 'test-report-1', variantId: 'variantId-1', reportType: 'report' }],
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
