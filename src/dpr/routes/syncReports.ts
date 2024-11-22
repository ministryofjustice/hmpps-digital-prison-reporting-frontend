/* eslint-disable no-param-reassign */
import type { RequestHandler } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

import SyncReportUtils from '../components/_sync/sync-report/utils'
import { EmbeddedSyncParams } from '../components/_sync/sync-report/types'

// DATA STORE
import UserDataStore from '../data/userDataStore'

// FEATURE: Download
import addDownloadRoutes from './download'
import DownloadPermissionService from '../services/downloadPermissionService'

export default function routes({ router, config, services, options, features }: EmbeddedSyncParams) {
  const { templatePath = 'dpr/views/', layoutPath = 'page.njk' } = config

  // Initialise the features
  ;({ router, services } = initFeatures({ router, config, services, options, features }))

  const errorHandler: RequestHandler = async (req, res) => {
    logger.error(`Error: ${JSON.stringify(req.body)}`)
    let { error } = req.body

    if (error && error.data) {
      error = error.data
    } else if (error && error.message) {
      error = { userMessage: `${error.name}: ${error.message}`, status: 'FAILED', stack: error.stack }
    }

    error.userMessage = ErrorSummaryUtils.mapError(error.userMessage)

    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
      error,
      ...req.params,
    })
  }

  const viewSyncReportHandler: RequestHandler = async (req, res, next) => {
    try {
      const renderData = await SyncReportUtils.getReport({ req, res, services, next, features, options })

      res.render(`${templatePath}sync-report`, {
        layoutPath,
        ...renderData,
      })
    } catch (error) {
      req.body.title = `Report Failed`
      req.body.errorDescription = 'We were unable to show this report for the following reason:'
      req.body.error = error
      next()
    }
  }

  const viewReportPaths = [
    '/dpr/embedded/sync/:type/:reportId/:id/report',
    '/dpr/embedded/sync/:type/:reportId/:id/report/:download',
  ]
  router.get(viewReportPaths, viewSyncReportHandler, errorHandler)
}

const initFeatures = ({ router, config, options, services, features }: EmbeddedSyncParams) => {
  const { redisClient, userId, templatePath = 'dpr/views/', layoutPath = 'page.njk' } = config
  const { testStore } = options

  let updatedServices: Services = {
    ...services,
  }

  if (redisClient && userId) {
    const userDataStore: UserDataStore = testStore || new UserDataStore(redisClient)

    if (features.download) {
      const downloadPermissionService = new DownloadPermissionService(userDataStore)
      downloadPermissionService.init(userId)
      updatedServices = {
        ...services,
        downloadPermissionService,
      }
      addDownloadRoutes({ router, services: updatedServices, layoutPath, templatePath })
    }
  } else if (features.download) {
    logger.info('Unable to init download feature. Missing redisClient or UserId')
  }
  return {
    router,
    services: updatedServices,
  }
}
