/* eslint-disable no-param-reassign */
import UserDataStore, { UserStoreConfig } from '../data/userDataStore'
import Dict = NodeJS.Dict
import { AsyncReportData, RequestStatus } from '../types/AsyncReport'

export default class AsyncReportStoreService {
  userConfig: UserStoreConfig

  userId: string

  requestedReports: AsyncReportData[]

  constructor(private readonly userStore: UserDataStore, userId: string) {
    this.userId = userId
    this.userStore = userStore
  }

  async init() {
    this.getState()
  }

  async getState() {
    this.userConfig = await this.userStore.getUserConfig(this.userId)
    this.requestedReports = <AsyncReportData[]>this.userConfig.requestedReports
  }

  async saveState() {
    this.userConfig.requestedReports = this.requestedReports
    await this.userStore.setUserConfig(this.userId, this.userConfig)
  }

  async addReport(
    reportData: Dict<string>,
    filterData: Dict<string>,
    sortData: Dict<string>,
    query: Dict<string>,
    querySummary: Array<Dict<string>>,
  ) {
    await this.getState()
    const {
      reportId,
      variantId,
      executionId,
      tableId,
      href: fullUrl,
      pathname,
      search,
      origin,
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

    reportStateData = this.updateDataByStatus(JSON.parse(JSON.stringify(reportStateData)), RequestStatus.SUBMITTED)
    this.requestedReports.unshift(reportStateData)
    await this.saveState()

    return reportStateData
  }

  async removeReport(id: string) {
    await this.getState()
    const index = this.findReportIndex(id)
    this.requestedReports.splice(index, 1)
    await this.saveState()
  }

  findReportIndex(id: string) {
    return this.requestedReports.findIndex((report) => report.executionId === id)
  }

  async getReport(id: string) {
    await this.getState()
    return this.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByExecutionId(id: string) {
    await this.getState()
    return this.requestedReports.find((report) => report.executionId === id)
  }

  async getReportByTableId(id: string) {
    await this.getState()
    return this.requestedReports.find((report) => report.tableId === id)
  }

  async getAllReports() {
    await this.getState()
    return this.requestedReports
  }

  async updateReport(id: string, data: Dict<string | number | RequestStatus>) {
    await this.getState()
    const index = this.findReportIndex(id)
    let report: AsyncReportData = this.requestedReports[index]
    if (report) {
      report = {
        ...report,
        ...data,
      }
    }
    this.requestedReports[index] = report
    await this.saveState()
  }

  async updateStatus(id: string, status: RequestStatus) {
    await this.getState()
    const index = this.findReportIndex(id)
    let report: AsyncReportData = this.requestedReports[index]
    if (report) report = this.updateDataByStatus(report, status)
    this.requestedReports[index] = report
    await this.saveState()
  }

  updateDataByStatus(report: AsyncReportData, status: RequestStatus | undefined) {
    const ts = new Date().toLocaleString()
    const { tableId } = report
    report.status = status
    switch (status) {
      case RequestStatus.FAILED:
        report.timestamp.failed = `Failed at: ${ts}`
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
