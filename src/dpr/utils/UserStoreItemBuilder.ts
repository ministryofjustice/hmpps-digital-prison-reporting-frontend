import type { Request } from 'express'
import {
  LoadType,
  ReportType,
  RequestedReport,
  RequestFormData,
  RequestStatus,
  UserReportData,
} from '../types/UserReports'
import Dict = NodeJS.Dict
import { getDpdPathSuffix } from './urlHelper'
import { SetQueryFromFiltersResult } from '../components/_async/async-filters-form/types'
import { DashboardMetricDefinition } from '../types/Dashboards'

export default class UserStoreItemBuilder {
  userStoreItem: UserReportData

  requestFormData: RequestFormData

  constructor(reportData?: RequestFormData) {
    this.requestFormData = reportData
    if (this.requestFormData) {
      this.initialiseItem()
    }
  }

  build = () => {
    return this.userStoreItem as RequestedReport
  }

  initialiseItem = () => {
    return this.addReportData({
      dataProductDefinitionsPath: this.requestFormData.dataProductDefinitionsPath,
      type: this.requestFormData.type as ReportType,
      reportId: this.requestFormData.reportId,
      reportName: this.requestFormData.reportName,
      description: this.requestFormData.description,
      id: this.requestFormData.id,
      name: this.requestFormData.name,
    })
  }

  addReportData = ({
    dataProductDefinitionsPath,
    type,
    reportId,
    reportName,
    description,
    id,
    name,
  }: {
    dataProductDefinitionsPath?: string
    type: ReportType
    reportId: string
    reportName: string
    description: string
    id: string
    name: string
  }) => {
    this.userStoreItem = {
      dataProductDefinitionsPath,
      type: type as ReportType,
      reportId,
      reportName,
      description,
      id,
      name,
      timestamp: {},
    }
    return this
  }

  addExecutionData = (executionData: { executionId: string; tableId: string }) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      ...executionData,
    }
    return this
  }

  addFilters = (filterData: Dict<string>) => {
    const filtersQueryString = new URLSearchParams(filterData).toString()
    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        filters: {
          data: filterData,
          queryString: filtersQueryString,
        },
      },
    }
    return this
  }

  addSortData = (sortData: Dict<string>) => {
    const sortByQueryString = new URLSearchParams(sortData).toString()
    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        sortBy: {
          data: sortData,
          queryString: sortByQueryString,
        },
      },
    }
    return this
  }

  addRequestUrls = () => {
    const { origin, pathname, search, href } = this.requestFormData
    const { executionId, dataProductDefinitionsPath } = this.userStoreItem

    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        url: {
          origin,
          request: {
            fullUrl: href,
            pathname,
            search,
          },
          polling: {
            fullUrl: `${origin}${pathname}/${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
            pathname: `${pathname}/${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
          },
          report: {},
        },
      },
    }

    return this
  }

  addReportUrls = (req: Request) => {
    const origin = req.get('host')
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`

    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        url: {
          origin: origin || this.userStoreItem.url.origin,
          ...(this.userStoreItem.url?.request && { request: this.userStoreItem.url.request }),
          ...(this.userStoreItem.url?.polling && { polling: this.userStoreItem.url.polling }),
          report: {
            fullUrl,
          },
        },
      },
    }

    return this
  }

  addLoadType = (loadType: LoadType) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      loadType,
    }

    return this
  }

  addQuery = (queryData: SetQueryFromFiltersResult) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        query: {
          data: queryData.query,
          summary: queryData.querySummary,
        },
      },
    }
    return this
  }

  addStatus = (status: RequestStatus) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      status,
    }
    return this
  }

  addMetrics = (metrics: DashboardMetricDefinition[]) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      metrics: metrics.map((metric: DashboardMetricDefinition) => {
        return { name: metric.name }
      }),
    }
    return this
  }

  addTimestamp = () => {
    const { status } = this.userStoreItem
    const ts = new Date()
    switch (status) {
      case RequestStatus.FAILED:
        this.userStoreItem.timestamp.failed = ts
        break
      case RequestStatus.EXPIRED:
        this.userStoreItem.timestamp.expired = ts
        break
      case RequestStatus.ABORTED:
        this.userStoreItem.timestamp.aborted = ts
        break
      case RequestStatus.FINISHED:
        this.userStoreItem.timestamp.completed = ts
        break
      case RequestStatus.SUBMITTED:
        this.userStoreItem.timestamp.requested = ts
        break
      case RequestStatus.STARTED:
      case RequestStatus.PICKED:
        break
      default:
        this.userStoreItem.timestamp.lastViewed = ts
        break
    }
    return this
  }
}
