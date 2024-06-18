/* eslint-disable no-param-reassign */
import UserDataStore from '../data/userDataStore'
import Dict = NodeJS.Dict
import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import UserStoreService from './userStoreService'

export default class AsyncReportStoreService extends UserStoreService {
  requestedReports: AsyncReportData[]

  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async getRequestedRportsState() {
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
    await this.getRequestedRportsState()
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
      description: reportData.variantDescription,
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
          fullUrl: `${origin}${pathname}/${executionId}`,
          pathname: `${pathname}/${executionId}`,
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
    await this.getRequestedRportsState()
    const index = this.findReportIndex(id)
    this.requestedReports.splice(index, 1)
    await this.saveRequestedReportState()
  }

  findReportIndex(id: string) {
    return this.requestedReports.findIndex((report) => report.executionId === id)
  }

  async getReport(id: string) {
    await this.getRequestedRportsState()
    return this.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByExecutionId(id: string) {
    await this.getRequestedRportsState()
    return this.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string) {
    await this.getRequestedRportsState()
    return this.requestedReports.find((report) => report.tableId === id)
  }

  async getAllReports() {
    await this.getRequestedRportsState()
    return this.requestedReports
  }

  async updateReport(id: string, data: Dict<string | number | RequestStatus>) {
    await this.getRequestedRportsState()
    const index = this.findReportIndex(id)
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

  async updateStatus(id: string, status: RequestStatus, errorMessage?: string) {
    await this.getRequestedRportsState()
    const index = this.findReportIndex(id)
    let report: AsyncReportData = this.requestedReports[index]
    if (report) report = this.updateDataByStatus(report, status, errorMessage)
    this.requestedReports[index] = report
    await this.saveRequestedReportState()
  }

  updateDataByStatus(report: AsyncReportData, status: RequestStatus | undefined, errorMessage?: string) {
    const ts = new Date().toLocaleString()
    const { tableId } = report
    report.status = status
    switch (status) {
      case RequestStatus.FAILED:
        report.timestamp.failed = `Failed at: ${ts}`
        report.errorMessage = errorMessage
        break
      case RequestStatus.FINISHED:
        report.timestamp.completed = `Ready at: ${ts}`
        report.url.report.pathname = `${report.url.request.pathname}/${tableId}/report`
        report.url.report.fullUrl = `${report.url.origin}${report.url.report.pathname}`
        if (report.dataProductDefinitionsPath) {
          report.url.report.fullUrl = `${report.url.report.fullUrl}?dataProductDefinitionsPath=${report.dataProductDefinitionsPath}`
        }
        break
      case RequestStatus.SUBMITTED:
        report.timestamp.requested = `Requested at: ${ts}`
        break
      default:
        report.timestamp.lastViewed = `Last viewed: ${ts}`
        break
    }
    return report
  }
}
