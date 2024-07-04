import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'

export interface AsyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
}
