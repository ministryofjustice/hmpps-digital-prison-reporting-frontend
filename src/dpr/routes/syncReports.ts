import type { RequestHandler, Router } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

import SyncReportUtils from '../utils/renderSyncReport'
import { SyncReportFeatures } from '../types/SyncReportUtils'

export default function routes({
  router,
  services,
  layoutPath,
  templatePath = 'dpr/views/',
  features,
}: {
  router: Router
  services: Services
  layoutPath: string
  templatePath?: string
  features?: SyncReportFeatures
}) {
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
      const renderData = await SyncReportUtils.getReport({ req, res, services, next, features })

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

  const viewReportPaths = ['/sync/:type/:reportId/:id/report', '/sync/:type/:reportId/:id/report/:download']
  router.get(viewReportPaths, viewSyncReportHandler, errorHandler)
}
