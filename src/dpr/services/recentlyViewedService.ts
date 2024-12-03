import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { RequestStatus, RequestedReport, RecentlyViewedReport, ReportType } from '../types/UserReports'
import { UserStoreConfig } from '../types/UserStore'

export default class RecentlyViewedStoreService extends UserStoreService {
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

  async addReport(reportData: RequestedReport, userId: string, userConfig: UserStoreConfig) {
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
