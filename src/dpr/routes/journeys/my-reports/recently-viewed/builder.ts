import type { Request, Response } from 'express'
import { QueryData } from 'src/dpr/components/_async/async-filters-form/types'
import {
  AsyncReportQueryData,
  AsyncReportUrlData,
  ParamsConfig,
  // RecentlyViewedReport,
} from '../../../../types/UserReports'
import StoreItemBuilder, { ReportData } from '../builder'
// import { RequestStatus } from '../../../../utils/ReportStatus/types'

class ViewedReportBuilder extends StoreItemBuilder {
  filters!: ParamsConfig

  sort!: ParamsConfig

  reportData!: ReportData

  requestUrls!: AsyncReportUrlData

  interactiveQuery!: QueryData

  asyncQueryData!: AsyncReportQueryData

  constructor(
    readonly req: Request,
    res: Response,
  ) {
    super(res)
  }

  // Public methods

  withReportData = (reportData: ReportData) => {
    this.reportData = reportData
  }

  withAsyncUrls = (url: AsyncReportUrlData) => {
    this.requestUrls = url
  }

  withInteractiveQuery = (interactiveQueryData: QueryData) => {
    this.interactiveQuery = interactiveQueryData
  }

  withAsycnQuery = (asyncQueryData: AsyncReportQueryData) => {
    this.asyncQueryData = asyncQueryData
  }

  // Builder methods

  // private buildReportData = () => {
  //   return this.buildReportMetaData(this.reportData)
  // }

  // private buildUrls = () => {
  //   const origin = this.req.get('host') || ''
  //   const report = this.buildReportUrls()
  //   const { polling, request } = this.requestUrls

  //   return {
  //     origin,
  //     polling,
  //     request,
  //     report,
  //   }
  // }

  // private buildReportUrls = () => {
  //   const origin = this.req.get('host') || ''
  //   const fullUrl = `${this.req.protocol}://${origin}${this.req.originalUrl}`

  //   const parsed = new URL(fullUrl)
  //   const { search } = parsed

  //   return {
  //     fullUrl,
  //     search,
  //   }
  // }

  // private buildStatus = () => {
  //   return RequestStatus.READY
  // }

  // private buildTimestamp = () => {
  //   return {
  //     viewed: new Date(),
  //   }
  // }

  // private buildInteractiveQuery = (): AsyncReportQueryData | undefined => {
  //   if (!this.interactiveQuery.query || !this.interactiveQuery.querySummary) return undefined

  //   const { query: data, querySummary: summary } = this.interactiveQuery

  //   return {
  //     data,
  //     summary,
  //   }
  // }

  // build = (): RecentlyViewedReport => {
  //   const viewedReportData: RecentlyViewedReport = {}

  //   // Validate it here

  //   return viewedReportData
  // }
}

export { ViewedReportBuilder }
export default ViewedReportBuilder
