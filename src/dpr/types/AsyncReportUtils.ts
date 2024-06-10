import { Response, Request } from 'express'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingClient from '../data/reportingClient'
import { UrlData } from '../components/pagination/types'

export interface AsyncReportUtilsParams {
  req?: Request
  res?: Response
  dataSources?: ReportingClient
  asyncReportsStore?: AsyncReportStoreService
  url?: UrlData
}
