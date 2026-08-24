import type { Request, Response } from 'express'
import { AsyncReportsTimestamp, ReportType, RequestFormData, SubscribedReport } from '../../../../types/UserReports'
import { StoreItemBuilder, ReportData } from '../builder'
import { RequestStatus } from '../../../../utils/ReportStatus/types'

export class SubscribedReportBuilder extends StoreItemBuilder {
  reportData!: ReportData

  timestamp!: AsyncReportsTimestamp

  status: RequestStatus = RequestStatus.PENDING

  constructor(
    readonly req: Request,
    res: Response,
  ) {
    super(res)
  }

  withTimestamp = (timestamp: AsyncReportsTimestamp) => {
    this.timestamp = timestamp

    return this
  }

  withStatus = (status: RequestStatus) => {
    this.status = status

    return this
  }

  // Builder methods

  private buildReportData = () => {
    const requestFormData: RequestFormData = this.req.body

    this.reportType = requestFormData.type as ReportType

    this.reportData = this.buildReportMetaData(requestFormData)
  }

  private buildUrls = () => {
    if (!this.executionData) return undefined

    const origin = this.req.get('host') || ''
    const report = this.buildReportUrls()

    return {
      origin,
      report,
    }
  }

  private buildReportUrls = () => {
    const origin = this.req.get('host') || ''

    const { reportId } = this.reportData
    const { id } = this.reportData
    const { type } = this.reportData
    const { tableId } = this.executionData

    const fullUrl = `${this.req.protocol}://${origin}/dpr/view-report/async/${type}/${reportId}/${id}/${tableId}/report`

    const parsed = new URL(fullUrl)
    const { search } = parsed

    return {
      fullUrl,
      search,
    }
  }

  build = (): SubscribedReport => {
    this.buildReportData()
    const url = this.buildUrls()
    const { status } = this

    const subscribedReportData: SubscribedReport = {
      ...this.reportData,
      ...this.executionData,
      url,
      status,
      timestamp: this.timestamp ?? {},
    }

    return subscribedReportData
  }
}
