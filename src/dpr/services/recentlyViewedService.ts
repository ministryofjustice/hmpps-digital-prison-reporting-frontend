import ReportStoreService from './reportStoreService'
import UserDataStore from '../data/reportDataStore'
import { RequestStatus, RequestedReport, RecentlyViewedReport, ReportType } from '../types/UserReports'
import { ReportStoreConfig } from '../types/ReportStore'

export default class RecentlyViewedStoreService extends ReportStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getAllReports(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports
  }

  async getAllReportsById(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.filter((requested) => {
      return (requested.id && requested.id === id) || (requested.variantId && requested.variantId === id)
    })
  }

  async setRecentlyViewed(reportData: RequestedReport, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(reportData.executionId, userConfig.recentlyViewedReports)

    if (index > -1) {
      userConfig.recentlyViewedReports.splice(index, 1)
      await this.saveState(userId, userConfig)
    }

    await this.addReport(reportData, userId, userConfig)
  }

  async addReport(reportData: RequestedReport, userId: string, userConfig: ReportStoreConfig) {
    const { reportId, executionId, tableId, reportName, name: variantName, description, url, query } = reportData

    const id = reportData.variantId || reportData.id
    const type = reportData.type || ReportType.REPORT
    const { request, report } = url

    const recentlyViewedReportData: RecentlyViewedReport = {
      reportId,
      id,
      executionId,
      tableId,
      reportName,
      name: variantName,
      description,
      type,
      status: RequestStatus.READY,
      url: {
        origin: url.origin,
        ...(request && { request }),
        ...(report && { report }),
      },
      timestamp: {
        lastViewed: new Date(),
      },
      query,
    }

    userConfig.recentlyViewedReports.unshift(recentlyViewedReportData)
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
    return userConfig.recentlyViewedReports[index].url.request.fullUrl
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
    }
    // eslint-disable-next-line no-param-reassign
    userConfig.recentlyViewedReports[index] = report
    await this.saveState(userId, userConfig)
  }

  async removeReport(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.recentlyViewedReports)
    userConfig.recentlyViewedReports.splice(index, 1)
    await this.saveState(userId, userConfig)
  }
}
