import ReportStoreService from '../../../../services/reportStoreService'
import UserDataStore from '../../../../data/reportDataStore'
import { RequestStatus, RequestedReport, RecentlyViewedReport, StoredReportData } from '../../../../types/UserReports'
import { ReportStoreConfig } from '../../../../types/ReportStore'

class RecentlyViewedStoreService extends ReportStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getAllReports(userId: string): Promise<StoredReportData[]> {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports
  }

  async getAllReportsById(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.filter((requested) => {
      return (requested.id && requested.id === id) || (requested.variantId && requested.variantId === id)
    })
  }

  async getReportById(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.find((viewed) => {
      return (viewed.id && viewed.id === id) || (viewed.variantId && viewed.variantId === id)
    })
  }

  async getReportByExecutionId(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.find((report) => report.tableId === id)
  }

  async setRecentlyViewed(reportData: RequestedReport, userId: string) {
    const userConfig = await this.getState(userId)
    const { executionId } = reportData

    const index = executionId
      ? this.findIndexByExecutionId(executionId, userConfig.recentlyViewedReports)
      : await this.findIndexByReportId(reportData.id, userConfig.recentlyViewedReports)

    // Remove the old entry before inserting the new at index 0
    if (index > -1) {
      userConfig.recentlyViewedReports.splice(index, 1)
      await this.saveState(userId, userConfig)
    }

    await this.addReport(reportData, userId, userConfig)
  }

  async addReport(reportData: RecentlyViewedReport, userId: string, userConfig: ReportStoreConfig) {
    userConfig.recentlyViewedReports.unshift(reportData)
    await this.saveState(userId, userConfig)
  }

  async setToExpired(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.recentlyViewedReports)
    await this.saveExpiredState(userConfig, index, userId)
  }

  async asyncSetToExpiredByTableId(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByTableId(id, userConfig.recentlyViewedReports)
    await this.saveExpiredState(userConfig, index, userId)

    const updatedItem = userConfig.recentlyViewedReports[index]
    const { url } = updatedItem

    return url?.request?.fullUrl || ''
  }

  async saveExpiredState(userConfig: ReportStoreConfig, index: number, userId: string) {
    let report: RecentlyViewedReport = userConfig.recentlyViewedReports[index]
    if (report) {
      report = {
        ...report,
        status: RequestStatus.EXPIRED,
        timestamp: {
          ...report.timestamp,
          expired: new Date(),
        },
      }
      // eslint-disable-next-line no-param-reassign
      userConfig.recentlyViewedReports[index] = report
      await this.saveState(userId, userConfig)
    }
  }

  async removeReport(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.recentlyViewedReports)
    userConfig.recentlyViewedReports.splice(index, 1)
    await this.saveState(userId, userConfig)
  }
}

export { RecentlyViewedStoreService }
export default RecentlyViewedStoreService
