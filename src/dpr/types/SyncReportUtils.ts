import { Response, Request, NextFunction, Router } from 'express'
import { Services } from './Services'
import UserDataStore, { RedisClient } from '../data/userDataStore'

export interface SyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
  options?: SyncReportOptions
  features: SyncReportFeatures
}

export interface EmbeddedSyncParams {
  router: Router
  config?: EmbeddedSyncParamsConfig
  services?: Services
  options?: SyncReportOptions
  features?: SyncReportFeatures
}

export interface EmbeddedSyncParamsConfig {
  layoutPath?: string
  templatePath?: string
  reportingClientArgs?: ReportingClientArgs
}

export interface SyncReportOptions {
  dpdPath?: string
  testStore?: UserDataStore
}

export interface SyncReportFeatures {
  config: SyncReportFeaturesConfig
  list: SyncReportFeaturesList[]
}

export interface SyncReportFeaturesConfig {
  userId?: string
  redisClient?: RedisClient
  userDataStore?: UserDataStore
}

interface ReportingClientArgs {
  url: string
  agent: { timeout: number }
}

export enum SyncReportFeaturesList {
  download = 'download',
  bookmark = 'bookmark',
  recentlyViewed = 'recentlyViewed',
}

export interface InitialisedFeatures {
  download?: boolean
  bookmark?: boolean
  recentlyViewed?: boolean
}
