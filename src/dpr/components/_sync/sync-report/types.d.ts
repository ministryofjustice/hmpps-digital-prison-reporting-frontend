import { Response, Request, NextFunction, Router } from 'express'
import { Services } from '../../../types/Services'
import { RedisClient } from '../../../data/userDataStore'

export interface SyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
  options: SyncReportOptions
  features: SyncReportFeatures
}

export interface SyncReportOptions {
  dpdPath?: string
  testStore?: UserDataStore
}

export interface SyncReportFeatures {
  download?: boolean
  bookmark?: boolean
  recentlyViewed?: boolean
}

export interface EmbeddedSyncParams {
  router: Router
  config: {
    layoutPath?: string
    templatePath?: string
    userId?: string
    redisClient?: RedisClient
  }
  services?: Services
  options?: SyncReportOptions
  features?: SyncReportFeatures
}
