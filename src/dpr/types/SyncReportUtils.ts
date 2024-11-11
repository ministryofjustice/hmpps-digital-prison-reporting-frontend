import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'

export interface SyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
  options: SyncReportOptions
}

export interface SyncReportOptions {
  download?: boolean
  bookmark?: boolean
  recentlyViewed?: boolean
  dynamicAutocompleteEndpoint?: string
}
