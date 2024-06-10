import { Response, Request } from 'express'
import AsyncReportStoreService from '../../services/requestedReportsService'
import ReportingClient from '../../../../package/dpr/data/reportingClient'

export interface RenderPollingParams {
  req: Request
  res: Response
  dataSources: ReportingClient
  asyncReportsStore?: AsyncReportStoreService
}
