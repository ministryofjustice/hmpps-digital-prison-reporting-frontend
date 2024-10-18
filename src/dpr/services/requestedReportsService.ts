/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import UserDataStore from '../data/userDataStore'
import { ReportType, RequestedReport, RequestStatus } from '../types/UserReports'
import UserStoreService from './userStoreService'
import { getDpdPathSuffix } from '../utils/urlHelper'
import { Template } from '../types/Templates'
import Dict = NodeJS.Dict
import { removeDuplicates } from '../utils/reportStoreHelper'
import { Services } from '../types/Services'
import { SetQueryFromFiltersResult } from '../components/async-filters/types'

export default class AsyncReportStoreService extends UserStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  /**
   * Updates the store with the request details
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Services} services
   * @param {SetQueryFromFiltersResult} querySummaryData
   * @param {string} executionId
   * @param {string} tableId
   * @return {*}  {Promise<string>}
   */
  async updateStore({
    req,
    res,
    services,
    querySummaryData,
    executionData,
    pollingUrlData,
  }: {
    req: Request
    res: Response
    services: Services
    querySummaryData?: SetQueryFromFiltersResult
    executionData: {
      executionId: string
      tableId: string
    }[]
    pollingUrlData: {
      fullUrl: string
      pathname: string
    }
  }): Promise<string> {
    const { search, variantId, type } = req.body
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    // 1. check for duplicate requests and remove them from the request list
    removeDuplicates({ storeService: services.asyncReportsStore, userId, variantId, search })
    removeDuplicates({ storeService: services.recentlyViewedStoreService, userId, variantId, search })

    const reportData = {
      ...req.body,
    }
    if (type === ReportType.REPORT) {
      reportData.executionId = executionData[0].executionId
      reportData.tableId = executionData[0].tableId
    } else {
      reportData.executionData = executionData
    }

    // 2. Add the new request data to the store
    const storedData = await this.addReport(reportData, userId, pollingUrlData, querySummaryData)

    return storedData.url.polling.pathname
  }

  async addReport(
    reportData: Dict<string>,
    userId: string,
    pollingUrlData: {
      fullUrl: string
      pathname: string
    },
    querySummaryData?: SetQueryFromFiltersResult,
  ) {
    const userConfig = await this.getState(userId)

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
      template,
      name,
      reportName,
      type,
    } = reportData

    let filtersQueryString
    let sortByQueryString
    let query
    let querySummary
    let filterData
    let sortData

    if (querySummaryData) {
      ;({ filterData, sortData, query, querySummary } = querySummaryData)
      filtersQueryString = new URLSearchParams(filterData).toString()
      sortByQueryString = new URLSearchParams(sortData).toString()
    }

    let reportStateData: RequestedReport = {
      reportId,
      variantId,
      executionId,
      tableId,
      name,
      variantName: name,
      reportName,
      description,
      type: type as ReportType,
      template: template as Template,
      status: RequestStatus.SUBMITTED,
      ...(filterData && {
        filters: {
          data: filterData,
          queryString: filtersQueryString,
        },
      }),
      ...(sortData && {
        sortBy: {
          data: sortData,
          queryString: sortByQueryString,
        },
      }),
      url: {
        origin,
        request: {
          fullUrl,
          pathname,
          search,
        },
        polling: pollingUrlData,
        report: {},
      },
      ...(query && {
        query: {
          data: query,
          summary: querySummary,
        },
      }),
      timestamp: {},
      dataProductDefinitionsPath,
    }

    reportStateData = this.updateDataByStatus(reportStateData, RequestStatus.SUBMITTED)
    userConfig.requestedReports.unshift(reportStateData)
    await this.saveState(userId, userConfig)

    return reportStateData
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

  async getAllReportsByVariantId(variantId: string, userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.requestedReports.filter((report) => {
      return report.variantId === variantId
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
