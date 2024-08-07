import UserStoreService from './userStoreService'
import UserDataStore from '../data/userDataStore'
import Dict = NodeJS.Dict
import { RecentlyViewedReportData } from '../types/RecentlyViewed'
import { RequestStatus, AsyncReportData, AsyncReportsTimestamp } from '../types/AsyncReport'

export default class RecentlyViewedStoreService extends UserStoreService {
  recentlyViewedReports: RecentlyViewedReportData[]

  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getRecentlyViewedState() {
    await this.getState()
    this.recentlyViewedReports = this.userConfig.recentlyViewedReports
  }

  async saveRecentlyViewedState() {
    this.userConfig.recentlyViewedReports = this.recentlyViewedReports
    await this.saveState()
  }

  async getReportByExecutionId(id: string) {
    await this.getRecentlyViewedState()
    return this.recentlyViewedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string) {
    await this.getRecentlyViewedState()
    return this.recentlyViewedReports.find((report) => report.tableId === id)
  }

  async getAllReports() {
    await this.getRecentlyViewedState()
    return this.recentlyViewedReports
  }

  async getAllReportsByVariantId(variantId: string) {
    return this.recentlyViewedReports.filter((report) => {
      return report.variantId === variantId
    })
  }

  reportExists(id: string) {
    return this.recentlyViewedReports.filter((rec) => rec.executionId === id).length > 0
  }

  async setRecentlyViewed(reportData: AsyncReportData) {
    await this.getRecentlyViewedState()
    if (this.reportExists(reportData.executionId)) {
      await this.removeReport(reportData.executionId)
    }
    await this.addReport(reportData)
  }

  async addReport(reportData: AsyncReportData) {
    await this.getRecentlyViewedState()
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

    this.recentlyViewedReports.unshift(recentlyViewedReportData)
    await this.saveRecentlyViewedState()

    return recentlyViewedReportData
  }

  async updateReport(id: string, data: Dict<string | number | RequestStatus | AsyncReportsTimestamp>) {
    await this.getRecentlyViewedState()
    const index = this.findIndexByExecutionId(id, this.recentlyViewedReports)
    let report: RecentlyViewedReportData = this.recentlyViewedReports[index]
    if (report) {
      report = {
        ...report,
        ...data,
      }
    }
    this.recentlyViewedReports[index] = report
    await this.saveRecentlyViewedState()
  }

  async setReportTimestamp(executionId: string, type: string) {
    const report = await this.getReportByExecutionId(executionId)
    if (report) {
      const timestamp: AsyncReportsTimestamp = {
        ...report.timestamp,
        ...(type === 'retry' && { retried: new Date() }),
        ...(type === 'refresh' && { refresh: new Date() }),
      }
      await this.updateReport(executionId, { timestamp })
    }
  }

  async setToExpired(id: string) {
    await this.getRecentlyViewedState()
    const index = this.findIndexByExecutionId(id, this.recentlyViewedReports)
    let report: RecentlyViewedReportData = this.recentlyViewedReports[index]
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
    this.recentlyViewedReports[index] = report
    await this.saveRecentlyViewedState()
  }

  async removeReport(id: string) {
    await this.getRecentlyViewedState()
    const index = this.findIndexByExecutionId(id, this.recentlyViewedReports)
    this.recentlyViewedReports.splice(index, 1)
    await this.saveRecentlyViewedState()
  }
}
