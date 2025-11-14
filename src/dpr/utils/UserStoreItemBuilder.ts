import type { Request } from 'express'
import parseUrl from 'parseurl'
import {
  AsyncReportUrlData,
  LoadType,
  ReportType,
  RequestedReport,
  RequestFormData,
  RequestStatus,
  UserReportData,
} from '../types/UserReports'
import Dict = NodeJS.Dict
import { ChildReportExecutionData, ExecutionData } from '../types/ExecutionData'
import { components } from '../types/api'

interface ReportData {
  type: ReportType
  reportId: string
  reportName: string
  description: string
  id: string
  name: string
}

class UserStoreItemBuilder {
  userStoreItem: UserReportData

  requestFormData: RequestFormData | Record<string, never>

  constructor(reportData: ReportData, requestFormData?: RequestFormData) {
    this.requestFormData = requestFormData || {}
    this.userStoreItem = this.addReportData(reportData)
  }

  build = () => {
    return this.userStoreItem as RequestedReport
  }

  addReportData = ({ type, reportId, reportName, description, id, name }: ReportData) => {
    return {
      type: type as ReportType,
      reportId,
      reportName,
      description,
      id,
      name,
      timestamp: {},
    }
  }

  addExecutionData = (executionData: ExecutionData) => {
    this.userStoreItem = {
      ...(<UserReportData>this.userStoreItem),
      ...executionData,
    }
    return this
  }

  addChildExecutionData = (childExecutionData: Array<ChildReportExecutionData>) => {
    this.userStoreItem = {
      ...(<UserReportData>this.userStoreItem),
      childExecutionData,
    }
    return this
  }

  addFilters = (filterData?: Record<string, string>) => {
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

  addSortData = (sortData: Record<string, string>) => {
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

  addRequestUrls = (req: Request) => {
    const { origin, pathname, search, href } = this.requestFormData
    const { executionId, dataProductDefinitionsPath, dpdPathFromQuery } = this.userStoreItem

    // Polling path
    let pollingPath = req.baseUrl.replace('/filters', `/${executionId}/status`)
    if (dpdPathFromQuery) {
      pollingPath = `${pollingPath}?dataProductDefinitionsPath=${dataProductDefinitionsPath}`
    }
    const pollingFullUrl = `${origin}${pollingPath}`
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
            fullUrl: pollingFullUrl,
            pathname: pollingPath,
          },
        },
      },
    }

    return this
  }

  addAsyncUrls = (url?: AsyncReportUrlData) => {
    if (url) {
      this.userStoreItem = {
        ...this.userStoreItem,
        ...{
          url,
        },
      }
    }

    return this
  }

  addReportUrls = (req: Request) => {
    const origin = req.get('host')
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    const urlData = parseUrl(req)

    this.userStoreItem = {
      ...this.userStoreItem,
      ...{
        url: {
          origin: origin || this.userStoreItem.url?.origin || '',
          ...(this.userStoreItem.url?.request && { request: this.userStoreItem.url.request }),
          ...(this.userStoreItem.url?.polling && { polling: this.userStoreItem.url.polling }),
          report: {
            ...(this.userStoreItem.url?.report && this.userStoreItem.url.report),
            fullUrl,
            ...(urlData && urlData.search && { search: urlData.search }),
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

  addQuery = (queryData?: { query: Dict<string | string[]>; querySummary: Array<Dict<string>> }) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      ...(queryData && {
        query: {
          data: queryData.query,
          summary: queryData.querySummary,
        },
      }),
    }
    return this
  }

  addInteractiveQuery = (queryData?: { query: Dict<string | string[]>; querySummary: Array<Dict<string>> }) => {
    if (queryData) {
      this.userStoreItem = {
        ...this.userStoreItem,
        ...{
          interactiveQuery: {
            data: queryData.query,
            summary: queryData.querySummary,
          },
        },
      }
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

  addMetrics = (metrics: components['schemas']['DashboardSectionDefinition'][]) => {
    this.userStoreItem = {
      ...this.userStoreItem,
      metrics: metrics.filter((metric) => metric.display).map((metric) => ({ name: metric.display || '' })),
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

  addDefinitionsPath = (definitionsPath: string, dpdPathFromQuery: boolean) => {
    if (definitionsPath) {
      this.userStoreItem = {
        ...this.userStoreItem,
        dataProductDefinitionsPath: definitionsPath,
        dpdPathFromQuery,
      }
    }
    return this
  }
}

export { UserStoreItemBuilder }
export default UserStoreItemBuilder
