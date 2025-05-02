/* eslint-disable no-param-reassign */
import UserDataStore from '../data/reportDataStore'
import { RequestedReport, RequestStatus } from '../types/UserReports'
import ReportStoreService from './reportStoreService'
import { getDpdPathSuffix } from '../utils/urlHelper'
import logger from '../utils/logger'

export default class RequestedReportService extends ReportStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
    logger.info('Service created: RequestedReportService')
  }

  async addReport(userId: string, reportStateData: RequestedReport) {
    const userConfig = await this.getState(userId)
    userConfig.requestedReports.unshift(reportStateData)
    await this.saveState(userId, userConfig)
  }

  async removeReport(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.requestedReports)
    userConfig.requestedReports.splice(index, 1)
    await this.saveState(userId, userConfig)
  }

  async getReportByExecutionId(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.requestedReports.find((report) => report.tableId === id)
  }

  async getAllReports(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.requestedReports
  }

  async getAllReportsById(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.requestedReports.filter((requested) => {
      return (requested.id && requested.id === id) || (requested.variantId && requested.variantId === id)
    })
  }

  async updateLastViewed(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.requestedReports)
    const report: RequestedReport = userConfig.requestedReports[index]
    report.timestamp.lastViewed = new Date()
    userConfig.requestedReports[index] = report
    await this.saveState(userId, userConfig)
  }

  async updateStatus(id: string, userId: string, status?: RequestStatus, errorMessage?: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.requestedReports)
    let report: RequestedReport = userConfig.requestedReports[index]
    if (report) report = this.updateDataByStatus(report, status, errorMessage)
    userConfig.requestedReports[index] = report
    await this.saveState(userId, userConfig)
  }

  async setToExpired(id: string, userId: string) {
    const userConfig = await this.getState(userId)
    const index = this.findIndexByExecutionId(id, userConfig.requestedReports)
    let report: RequestedReport = userConfig.requestedReports[index]
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
    userConfig.requestedReports[index] = report
    await this.saveState(userId, userConfig)
  }

  updateDataByStatus(report: RequestedReport, status?: RequestStatus | undefined, errorMessage?: string) {
    const { dataProductDefinitionsPath, dpdPathFromQuery } = report

    const ts = new Date()
    const { tableId } = report
    if (status) report.status = status
    switch (status) {
      case RequestStatus.FAILED:
        report.timestamp.failed = ts
        report.errorMessage = errorMessage
        break
      case RequestStatus.EXPIRED:
        report.timestamp.expired = ts
        break
      case RequestStatus.ABORTED:
        report.timestamp.aborted = ts
        break
      case RequestStatus.FINISHED: {
        report.timestamp.completed = ts
        const search = report.url.report?.search ? report.url.report.search : ''
        const dpdPath = dpdPathFromQuery ? `${getDpdPathSuffix(dataProductDefinitionsPath)}` : ''

        report.url.report.pathname = search
          ? `${report.url.request.pathname}/${tableId}/report${search}`
          : `${report.url.request.pathname}/${tableId}/report${dpdPath}`

        report.url.report.fullUrl = `${report.url.origin}${report.url.report.pathname}`
        break
      }
      case RequestStatus.SUBMITTED:
        report.timestamp.requested = ts
        break
      case RequestStatus.STARTED:
      case RequestStatus.PICKED:
        break
      default:
        report.timestamp.lastViewed = ts
        break
    }

    return report
  }
}
