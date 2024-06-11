import { Response, Request, NextFunction } from 'express'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'

export interface AsyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  dataSources?: ReportingService
  asyncReportsStore?: AsyncReportStoreService
}
