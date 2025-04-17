import { Services } from '../types/Services'
import logger from './logger'
import {
  EmbeddedSyncParams,
  EmbeddedSyncParamsConfig,
  InitialisedFeatures,
  EmbeddedReportFeatures,
  EmbeddedReportFeaturesList,
} from '../types/EmbeddedReportUtils'
// DATA STORE
import ReportDataStore from '../data/reportDataStore'

// FEATURE: Download
import addDownloadRoutes from '../routes/download'
import DownloadPermissionService from '../services/downloadPermissionService'
import ReportingClient from '../data/reportingClient'
import ReportingService from '../services/reportingService'

export const initUserDataStore = (features: EmbeddedReportFeatures, services: Services) => {
  logger.info('Embedded Reports: Setting up user data store.')

  const { config: featuresConfig, list } = features
  const { redisClient, userDataStore } = featuresConfig
  let initialisedUserDataStore: ReportDataStore

  if (redisClient) {
    logger.info('Embedded Reports: Redis Client found. Initialising User Data store.')
    return new ReportDataStore(redisClient)
  }
  if (userDataStore) {
    logger.info('Embedded Reports: User data store found. Using the provided user data store')
    return userDataStore
  }

  logger.info('No user data store config provided. Assuming pre-initialisation of feature services')

  const errorMessages: string[] = []
  if (!services.downloadPermissionService && list.includes(EmbeddedReportFeaturesList.download)) {
    errorMessages.push('Missing downloadPermissionService in services config: Cant enable download feature')
  }

  if (!services.bookmarkService && list.includes(EmbeddedReportFeaturesList.bookmark)) {
    errorMessages.push('Missing bookmarkService in services config: Cant enable bookmark feature')
  }

  if (!services.recentlyViewedService && list.includes(EmbeddedReportFeaturesList.recentlyViewed)) {
    errorMessages.push('Missing recentlyViewedService in services config: Cant enable recently feature')
  }

  if (errorMessages.length) {
    throw new Error(errorMessages.join(', '))
  }

  return initialisedUserDataStore
}

const initFeatures = ({ router, config, services, features }: EmbeddedSyncParams) => {
  let updatedServices: Services = {
    ...services,
  }

  const initialisedFeatures: InitialisedFeatures = {}

  if (features !== undefined) {
    logger.info(`Embedded Reports: Features config found. Initialising features: ${features.list}`)

    const { config: featuresConfig, list } = features
    const { userId } = featuresConfig
    const { templatePath, layoutPath } = config

    const downloadFeatureEnabled = list.includes(EmbeddedReportFeaturesList.download)
    const bookmarkFeatureEnabled = list.includes(EmbeddedReportFeaturesList.bookmark)
    const recentlyViewedFeatureEnabled = list.includes(EmbeddedReportFeaturesList.recentlyViewed)

    const initialisedUserDataStore: ReportDataStore = initUserDataStore(features, services)

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
          logger.info('Download Feature: Service initialised and added to services config')
        } else {
          logger.info('Download Feature: DownloadPermissionService found')
        }

        initialisedFeatures.download = true

        addDownloadRoutes({ router, services: updatedServices, layoutPath, templatePath })
      } catch (error) {
        logger.info('Download Feature: Unable to init feature.')
        throw error
      }
    }

    if (recentlyViewedFeatureEnabled) {
      logger.info('Recently Viewed Feature: Not Available')
    }

    if (bookmarkFeatureEnabled) {
      logger.info('Bookmark Feature: Not Available')
    }
  }

  return {
    router,
    services: updatedServices,
    initialisedFeatures,
  }
}

const initReportingService = (config: EmbeddedSyncParamsConfig, services: Services) => {
  let updatedServices = {
    ...services,
  }
  if (config?.reportingClientArgs) {
    logger.info('Embedded Reports: Reporting config found')
    if (services.reportingService) {
      logger.info('Embedded Reports: Reporting Service Found. Using service provided')
    } else {
      logger.info('Embedded Reports: Initialising Reporting Client and Service')

      const reportingClient = new ReportingClient(config.reportingClientArgs)
      const reportingService = new ReportingService(reportingClient)

      updatedServices = {
        ...services,
        reportingService,
      }
    }
  } else if (services.reportingService) {
    logger.info('Embedded Reports: Reporting Service Found. Using service provided')
  } else {
    logger.error(
      'Embedded Reports: No Reporting service or Config Found. Please provide an initialiesed report service, or the correct config',
    )
  }

  return {
    services: updatedServices,
  }
}

export default {
  initFeatures,
  initReportingService,
}
