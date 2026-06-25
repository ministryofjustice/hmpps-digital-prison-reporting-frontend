import type { Request, Response } from 'express'
import { QueryData } from '../../../../components/_async/async-filters-form/types'
import {
  AsyncReportQueryData,
  AsyncReportUrlData,
  ParamsConfig,
  RecentlyViewedReport,
} from '../../../../types/UserReports'
import { StoreItemBuilder, ReportData } from '../builder'
import { RequestStatus } from '../../../../utils/ReportStatus/types'
import { normalizeQueryStringArray } from '../../../../utils/queryMappers'

export class ViewedReportBuilder extends StoreItemBuilder {
  filters!: ParamsConfig

  sort!: ParamsConfig

  reportData!: ReportData

  requestUrls!: AsyncReportUrlData | undefined

  interactiveQuery!: QueryData

  asyncQueryData!: AsyncReportQueryData | undefined

  constructor(
    readonly req: Request,
    res: Response,
  ) {
    super(res)
  }

  // Public methods

  withReportData = (reportData: ReportData) => {
    this.reportData = reportData

    return this
  }

  withRequestData = (asyncQueryData: AsyncReportQueryData | undefined, url: AsyncReportUrlData | undefined) => {
    this.withAsyncUrls(url)
    this.withAsyncQuery(asyncQueryData)

    return this
  }

  private withAsyncUrls = (url: AsyncReportUrlData | undefined) => {
    this.requestUrls = url
  }

  private withAsyncQuery = (asyncQueryData: AsyncReportQueryData | undefined) => {
    this.asyncQueryData = asyncQueryData
  }

  withInteractiveQuery = (interactiveQueryData: QueryData) => {
    this.interactiveQuery = interactiveQueryData

    return this
  }

  // Builder methods

  private buildReportData = () => {
    return this.buildReportMetaData(this.reportData)
  }

  private buildUrls = () => {
    const origin = this.req.get('host') || ''
    const report = this.buildReportUrls()

    let polling
    let request

    if (this.requestUrls) {
      polling = this.requestUrls.polling
      request = this.requestUrls.request
    }

    return {
      origin,
      ...(polling && { polling }),
      ...(request && { request }),
      report,
    }
  }

  private buildReportUrls = () => {
    const origin = this.req.get('host') || ''
    const fullUrl = `${this.req.protocol}://${origin}${this.req.originalUrl}`

    const parsed = new URL(fullUrl)
    const { search } = parsed

    return {
      fullUrl,
      search,
    }
  }

  private buildStatus = () => {
    return RequestStatus.READY
  }

  private buildTimestamp = () => {
    return {
      lastViewed: new Date(),
    }
  }

  private buildInteractiveQuery = (): AsyncReportQueryData | undefined => {
    if (!this.interactiveQuery.query || !this.interactiveQuery.querySummary) {
      return undefined
    }

    const { query, querySummary: summary } = this.interactiveQuery

    const data = {
      ...query,
      ...(query['columns'] && {
        columns: normalizeQueryStringArray(query['columns']),
      }),
    }

    return {
      data,
      summary,
    }
  }

  build = (): RecentlyViewedReport => {
    const reportData = this.buildReportData()
    const url = this.buildUrls()
    const status = this.buildStatus()
    const timestamp = this.buildTimestamp()
    const definitionsPath = this.buidDefinitionsPath()
    const interactiveQuery = this.buildInteractiveQuery()

    const viewedReportData: RecentlyViewedReport = {
      ...reportData,
      ...this.executionData,
      ...(definitionsPath && definitionsPath),
      ...(this.asyncQueryData && { query: this.asyncQueryData }),
      ...(interactiveQuery && { interactiveQuery }),
      url,
      status,
      timestamp,
    }

    return viewedReportData
  }
}
