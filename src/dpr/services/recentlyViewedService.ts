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
      url: {
        origin: url.origin,
        request: {
          fullUrl: url.request.fullUrl,
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

  async setReportRetriedTimestamp(id: string) {
    const retriedReport = await this.getReportByExecutionId(id)
<<<<<<< HEAD
    if (retriedReport) {
      const timestamp: AsyncReportsTimestamp = {
        ...retriedReport.timestamp,
        retried: new Date(),
      }
      await this.updateReport(id, { timestamp })
    }
=======
    const timestamp: AsyncReportsTimestamp = {
      ...retriedReport.timestamp,
      retried: new Date(),
    }
    await this.updateReport(id, { timestamp })
>>>>>>> main
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
