import type { Request, Response } from 'express'
import {
  AsyncReportQueryData,
  ParamsConfig,
  ReportType,
  RequestedDashboard,
  RequestedReport,
  RequestFormData,
} from '../../../../types/UserReports'
import { StoreItemBuilder } from '../builder'
import { RequestStatus } from '../../../../utils/ReportStatus/types'
import { components } from '../../../../types/api'

export class RequestedReportBuilder extends StoreItemBuilder {
  filters!: ParamsConfig

  sort!: ParamsConfig

  constructor(
    readonly req: Request,
    res: Response,
  ) {
    super(res)
  }

  private buildReportData = () => {
    const requestFormData: RequestFormData = this.req.body
    this.reportType = requestFormData.type as ReportType

    return this.buildReportMetaData(requestFormData)
  }

  private buildFilters = () => {
    if (!this.queryData || !this.queryData.filterData) return undefined

    const { filterData } = this.queryData

    return {
      data: filterData,
      queryString: new URLSearchParams(filterData).toString(),
    }
  }

  private buildSortData = () => {
    if (!this.queryData || !this.queryData?.sortData) return undefined

    const { sortData } = this.queryData

    return {
      data: sortData,
      queryString: new URLSearchParams(sortData).toString(),
    }
  }

  private buildRequestUrls = () => {
    const url = new URL(this.req.originalUrl, `${this.req.protocol}://${this.req.get('host')}`)
    const { pathname, search, origin } = url

    const pollingUrlData = this.setPollingUrlData(origin)

    const requestUrlData = {
      fullUrl: `${origin}${this.req.originalUrl}`,
      pathname,
      search,
    }

    return {
      origin,
      request: requestUrlData,
      polling: pollingUrlData,
    }
  }

  private setPollingUrlData = (origin: string) => {
    const { definitionsPath, dpdPathFromQuery } = this.res.locals

    const { executionId } = this.executionData

    let pollingPath = this.req.baseUrl.replace('/filters', `/${executionId}/status`)
    if (dpdPathFromQuery) {
      pollingPath = `${pollingPath}?dataProductDefinitionsPath=${definitionsPath}`
    }

    const pollingFullUrl = `${origin}${pollingPath}`

    return {
      fullUrl: pollingFullUrl,
      pathname: pollingPath,
    }
  }

  private buildStatus = () => {
    return RequestStatus.SUBMITTED
  }

  private buildTimestamp = () => {
    return {
      requested: new Date(),
    }
  }

  private buildQuery = (): AsyncReportQueryData | undefined => {
    if (!this.queryData?.query || !this.queryData.querySummary) return undefined

    const { query: data, querySummary: summary } = this.queryData

    return {
      data,
      summary,
    }
  }

  private buildSections = () => {
    if (!this.reportType && this.reportType !== ReportType.DASHBOARD) return undefined

    const bodySections = this.req.body.sections

    const sections: components['schemas']['DashboardSectionDefinition'][] = bodySections
      ? JSON.parse(this.req.body.sections)
      : []

    return sections.filter(section => section.display).map(section => ({ name: section.display || '' }))
  }

  build = (): RequestedReport => {
    const reportData = this.buildReportData()
    const filters = this.buildFilters()
    const sortBy = this.buildSortData()
    const url = this.buildRequestUrls()
    const status = this.buildStatus()
    const timestamp = this.buildTimestamp()
    const definitionsPath = this.buidDefinitionsPath()
    const query = this.buildQuery()
    const metrics = this.buildSections()

    const requestedReportData: RequestedReport | RequestedDashboard = {
      ...reportData,
      ...this.executionData,
      ...(this.childExecutionData && { childExecutionData: this.childExecutionData }),
      ...(filters && { filters }),
      ...(sortBy && { sortBy }),
      ...(query && { query }),
      ...(metrics && { metrics }),
      ...(definitionsPath && definitionsPath),
      url,
      status,
      timestamp,
    }

    return requestedReportData
  }
}
