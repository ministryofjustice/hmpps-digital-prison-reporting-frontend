/* eslint-disable no-param-reassign */
import UserDataStore from '../data/userDataStore'
import Dict = NodeJS.Dict
import { AsyncReportData, AsyncReportsTimestamp, RequestStatus } from '../types/AsyncReport'
import UserStoreService from './userStoreService'
import { getDpdPathSuffix } from '../utils/urlHelper'

export default class AsyncReportStoreService extends UserStoreService {
  requestedReports: AsyncReportData[]

  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getRequestedReportsState() {
    await this.getState()
    this.requestedReports = <AsyncReportData[]>this.userConfig.requestedReports
  }

  async saveRequestedReportState() {
    this.userConfig.requestedReports = this.requestedReports
    await this.saveState()
  }

  async addReport(
    reportData: Dict<string>,
    filterData: Dict<string>,
    sortData: Dict<string>,
    query: Dict<string>,
    querySummary: Array<Dict<string>>,
  ) {
    await this.getRequestedReportsState()
    const {
      reportId,
      variantId,
      executionId,
      tableId,
      href: fullUrl,
      pathname,
      search,
      origin = '',
      dataProductDefinitionsPath,
      description,
    } = reportData

    const filtersQueryString = new URLSearchParams(filterData).toString()
    const sortyByQueryString = new URLSearchParams(sortData).toString()

    let reportStateData: AsyncReportData = {
      reportId,
      variantId,
      executionId,
      tableId,
      name: reportData.variantName,
      reportName: reportData.reportName,
      description,
      status: RequestStatus.SUBMITTED,
      filters: {
        data: filterData,
        queryString: filtersQueryString,
      },
      sortBy: {
        data: sortData,
        queryString: sortyByQueryString,
      },
      url: {
        origin,
        request: {
          fullUrl,
          pathname,
          search,
        },
        polling: {
          fullUrl: `${origin}${pathname}/${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
          pathname: `${pathname}/${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
        },
        report: {},
      },
      query: {
        data: query,
        summary: querySummary,
      },
      timestamp: {},
      dataProductDefinitionsPath,
    }

    reportStateData = this.updateDataByStatus(reportStateData, RequestStatus.SUBMITTED)
    this.requestedReports.unshift(reportStateData)
    await this.saveRequestedReportState()

    return reportStateData
  }

  async removeReport(id: string) {
    await this.getRequestedReportsState()
    const index = this.findIndexByExecutionId(id, this.requestedReports)
    this.requestedReports.splice(index, 1)
    await this.saveRequestedReportState()
  }

  async getReportByExecutionId(id: string) {
    await this.getRequestedReportsState()
    return this.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string) {
    await this.getRequestedReportsState()
    return this.requestedReports.find((report) => report.tableId === id)
  }

  async getAllReports() {
    await this.getRequestedReportsState()
    return this.requestedReports
  }

  async updateReport(id: string, data: Dict<string | number | RequestStatus | AsyncReportsTimestamp>) {
    await this.getRequestedReportsState()
    const index = this.findIndexByExecutionId(id, this.requestedReports)
    let report: AsyncReportData = this.requestedReports[index]
    if (report) {
      report = {
        ...report,
        ...data,
      }
    }
    this.requestedReports[index] = report
    await this.saveRequestedReportState()
  }

  async setReportRetriedTimestamp(id: string) {
    const retriedReport = await this.getReportByExecutionId(id)
    if (retriedReport) {
      const timestamp: AsyncReportsTimestamp = {
        ...retriedReport.timestamp,
        retried: new Date(),
      }
      await this.updateReport(id, { timestamp })
    }
  }

  async updateLastViewed(id: string) {
    await this.getRequestedReportsState()
    const index = this.findIndexByExecutionId(id, this.requestedReports)
    const report: AsyncReportData = this.requestedReports[index]
    report.timestamp.lastViewed = new Date()
    this.requestedReports[index] = report
    await this.saveRequestedReportState()
  }

  async updateStatus(id: string, status?: RequestStatus, errorMessage?: string) {
    await this.getRequestedReportsState()
    const index = this.findIndexByExecutionId(id, this.requestedReports)
    let report: AsyncReportData = this.requestedReports[index]
    if (report) report = this.updateDataByStatus(report, status, errorMessage)
    this.requestedReports[index] = report
    await this.saveRequestedReportState()
  }

  updateDataByStatus(report: AsyncReportData, status?: RequestStatus | undefined, errorMessage?: string) {
    const ts = new Date()
    const { tableId } = report
    if (status) report.status = status
    switch (status) {
      case RequestStatus.FAILED:
        report.timestamp.failed = ts
        report.errorMessage = errorMessage
        break
      case RequestStatus.FINISHED:
        report.timestamp.completed = ts
        report.url.report.pathname = `${report.url.request.pathname}/${tableId}/report${getDpdPathSuffix(
          report.dataProductDefinitionsPath,
        )}`
        report.url.report.fullUrl = `${report.url.origin}${report.url.report.pathname}${getDpdPathSuffix(
          report.dataProductDefinitionsPath,
        )}`
        break
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
