import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'
import { RequestStatus, AsyncReportData } from '../types/AsyncReport'
import { UserStoreConfig } from '../types/UserStore'

export default class RecentlyViewedStoreService extends UserStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getAllReports(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports
  }

  async getAllReportsByVariantId(variantId: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.recentlyViewedReports.filter((report) => {
      return report.variantId === variantId
    })
  }

  async setRecentlyViewed(reportData: AsyncReportData, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(reportData.executionId, userConfig.recentlyViewedReports)

    if (index > -1) {
      userConfig.recentlyViewedReports.splice(index, 1)
      await this.saveState(userId, userConfig)
    }

    await this.addReport(reportData, userId, userConfig)
  }

  async addReport(reportData: AsyncReportData, userId: string, userConfig: UserStoreConfig) {
    const {
      reportId,
      variantId,
      executionId,
      tableId,
      reportName,
      name: variantName,
      description,
      url,
      query,
    } = reportData

    const recentlyViewedReportData: RecentlyViewedReportData = {
      reportId,
      variantId,
      executionId,
      tableId,
      reportName,
      variantName,
      description,
      status: RequestStatus.READY,
      url: {
        origin: url.origin,
        request: {
          fullUrl: url.request.fullUrl,
          search: url.request.search,
        },
        report: {
          fullUrl: url.report.fullUrl,
        },
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
    let report: RecentlyViewedReportData = userConfig.recentlyViewedReports[index]
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
