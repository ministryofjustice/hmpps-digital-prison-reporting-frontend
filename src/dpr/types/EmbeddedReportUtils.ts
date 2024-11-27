import { Response, Request, NextFunction, Router } from 'express'
import { Services } from './Services'
import UserDataStore, { RedisClient } from '../data/userDataStore'

export interface EmbeddedReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
  options?: EmbeddedReportOptions
  features: EmbeddedReportFeatures
}

export interface EmbeddedSyncParams {
  router: Router
  config?: EmbeddedSyncParamsConfig
  services?: Services
  options?: EmbeddedReportOptions
  features?: EmbeddedReportFeatures
}

export interface EmbeddedSyncParamsConfig {
  layoutPath?: string
  templatePath?: string
  reportingClientArgs?: ReportingClientArgs
}

export interface EmbeddedReportOptions {
  dpdPath?: string
}

export interface EmbeddedReportFeatures {
  config: EmbeddedReportFeaturesConfig
  list: EmbeddedReportFeaturesList[]
}

export interface EmbeddedReportFeaturesConfig {
  userId?: string
  redisClient?: RedisClient
  userDataStore?: UserDataStore
}

interface ReportingClientArgs {
  url: string
  agent: { timeout: number }
}

export enum EmbeddedReportFeaturesList {
  download = 'download',
  bookmark = 'bookmark',
  recentlyViewed = 'recentlyViewed',
}

export interface InitialisedFeatures {
  download?: boolean
  bookmark?: boolean
  recentlyViewed?: boolean
}
