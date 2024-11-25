import { Services } from '../types/Services'
import logger from './logger'
import {
  EmbeddedSyncParams,
  InitialisedFeatures,
  SyncReportFeatures,
  SyncReportFeaturesList,
} from '../types/SyncReportUtils'
// DATA STORE
import UserDataStore from '../data/userDataStore'

// FEATURE: Download
import addDownloadRoutes from '../routes/download'
import DownloadPermissionService from '../services/downloadPermissionService'

export const initUserDataStore = (features: SyncReportFeatures, services: Services) => {
  logger.info('Sync Reports: Setting up user data store.')

  const { config: featuresConfig, list } = features
  const { redisClient, userDataStore } = featuresConfig
  let initialisedUserDataStore: UserDataStore

  if (redisClient) {
    logger.info('Sync Reports: Redis Client found. Initialising User Data store.')
    return new UserDataStore(redisClient)
  }
  if (userDataStore) {
    logger.info('Sync Reports: User data store found. Using the provided user data store')
    return userDataStore
  }

  logger.info('No user data store config provided. Assuming pre-initialisation of feature services')

  const errorMessages: string[] = []
  if (!services.downloadPermissionService && list.includes(SyncReportFeaturesList.download)) {
    errorMessages.push('Missing downloadPermissionService in services config: Cant enable download feature')
  }

  if (!services.bookmarkService && list.includes(SyncReportFeaturesList.bookmark)) {
    errorMessages.push('Missing bookmarkService in services config: Cant enable bookmark feature')
  }

  if (!services.recentlyViewedService && list.includes(SyncReportFeaturesList.recentlyViewed)) {
    errorMessages.push('Missing recentlyViewedService in services config: Cant enable recently feature')
  }

  if (errorMessages.length) {
    throw new Error(errorMessages.join(', '))
  }

  return initialisedUserDataStore
}

const initFeatures = ({ router, config, services, features }: EmbeddedSyncParams) => {
  const { config: featuresConfig, list } = features
  const { userId } = featuresConfig
  const { templatePath, layoutPath } = config

  let updatedServices: Services = {
    ...services,
  }

  const initialisedFeatures: InitialisedFeatures = {}

  if (features !== undefined) {
    logger.info(`Sync Reports: Features config found. Initialising features: ${features.list}`)

    const downloadFeatureEnabled = list.includes(SyncReportFeaturesList.download)
    const bookmarkFeatureEnabled = list.includes(SyncReportFeaturesList.bookmark)
    const recentlyViewedFeatureEnabled = list.includes(SyncReportFeaturesList.recentlyViewed)

    const initialisedUserDataStore: UserDataStore = initUserDataStore(features, services)

    if (downloadFeatureEnabled) {
      logger.info(`Download Feature: Setup`)
      try {
        if (!services.downloadPermissionService && initialisedUserDataStore) {
          logger.info('Download Feature: DownloadPermissionService not provided. Initialising new service')

          const downloadPermissionService = new DownloadPermissionService(initialisedUserDataStore)
          downloadPermissionService.init(userId)

          updatedServices = {
            ...services,
            downloadPermissionService,
          }

          initialisedFeatures.download = true

          logger.info('Download Feature: Service initialised and added to services config')
        }

        addDownloadRoutes({ router, services: updatedServices, layoutPath, templatePath })
      } catch (error) {
        logger.info('Download Feature: Unable to init feature.')
        throw error
      }
    }

    if (recentlyViewedFeatureEnabled) {
      throw new Error('Recently Viewed Feature: Not Available')
    }

    if (bookmarkFeatureEnabled) {
      throw new Error('Bookmark Feature: Not Available')
    }
  }

  return {
    router,
    services: updatedServices,
    initialisedFeatures,
  }
}

export default {
  initFeatures,
}
