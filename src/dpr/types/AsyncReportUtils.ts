import { Response, Request, NextFunction } from 'express'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingClient from '../data/reportingClient'

export interface AsyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  dataSources?: ReportingClient
  asyncReportsStore?: AsyncReportStoreService
}
