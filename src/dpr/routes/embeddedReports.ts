/* eslint-disable no-param-reassign */
import type { RequestHandler } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import logger from '../utils/logger'

import EmbeddedReportUtils from '../components/_embedded/embedded-report/utils'
import { EmbeddedSyncParams, EmbeddedSyncParamsConfig } from '../types/EmbeddedReportUtils'

import EmbeddedRouteUtils from '../utils/embeddedRouteUtils'

export default function routes({ router, config, services, options, features }: EmbeddedSyncParams) {
  logger.info('Sync Reports: Initialiasing routes')

  const routeConfig: EmbeddedSyncParamsConfig = {
    templatePath: config?.templatePath || 'dpr/views/',
    layoutPath: config?.layoutPath || 'page.njk',
  }
  const { templatePath, layoutPath } = routeConfig

  ;({ services } = EmbeddedRouteUtils.initReportingService(config, services))

  let initialisedFeatures
  try {
    ;({ router, services, initialisedFeatures } = EmbeddedRouteUtils.initFeatures({
      router,
      services,
      config: routeConfig,
      features,
    }))
  } catch (error) {
    logger.error(error, 'Init features error')
  }

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
      const renderData = await EmbeddedReportUtils.getReport({ req, res, services, next, features, options })

      res.render(`${templatePath}embedded-report`, {
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

  const viewReportPaths = ['/dpr/embedded/sync/:type/:reportId/:id/report']
  if (initialisedFeatures.download) {
    viewReportPaths.push('/dpr/embedded/sync/:type/:reportId/:id/report/:download')
  }
  router.get(viewReportPaths, viewSyncReportHandler, errorHandler)

  if (Object.keys(initialisedFeatures).length) {
    logger.info(`Sync Reports: Features Initialised:`)
    Object.keys(initialisedFeatures).forEach((key) => {
      logger.info(`Sync Reports: Feature: ${key}`)
    })
  }

  logger.info(`Sync Reports: Routes Initialised:`)
  viewReportPaths.forEach((path) => {
    logger.info(`Sync Reports: GET: ${path}`)
  })

  logger.info(`Done! 🙂`)
}
