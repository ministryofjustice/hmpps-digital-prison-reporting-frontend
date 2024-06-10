import { Request, Response } from 'express'
import { UrlData } from '../pagination/types'
import AsyncReportStoreService from '../../services/requestedReportsService'

export interface GetReportParams {
  req: Request
  res: Response
  url: UrlData
  asyncReportsStore?: AsyncReportStoreService
  dataSources: any
}
