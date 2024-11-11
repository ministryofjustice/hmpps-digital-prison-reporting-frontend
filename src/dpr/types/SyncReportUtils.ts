import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'

export interface SyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
  options: SyncReportOptions
  features: SyncReportFeatures
}

export interface SyncReportOptions {
  dynamicAutocompleteEndpoint?: string
}

export interface SyncReportFeatures {
  download?: boolean
  bookmark?: boolean
  recentlyViewed?: boolean
}
