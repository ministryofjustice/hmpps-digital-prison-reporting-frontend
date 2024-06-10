import { Response, Request, NextFunction } from 'express'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingClient from '../data/reportingClient'
import { UrlData } from '../components/pagination/types'

export interface AsyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  dataSources?: ReportingClient
  asyncReportsStore?: AsyncReportStoreService
  url?: UrlData
}
