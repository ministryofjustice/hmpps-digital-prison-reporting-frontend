import type { RequestHandler, Router } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

import SyncReportUtils from '../utils/renderSyncReport'

export default function routes({
  router,
  services,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  services: Services
  layoutPath: string
  templatePath?: string
}) {
  const asyncErrorHandler: RequestHandler = async (req, res) => {
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
    const { type } = req.params
    try {
      const params = { req, res, services, next }

      const renderData = await SyncReportUtils.getReport(params)

      res.render(`${templatePath}sync-report`, {
        layoutPath,
        ...renderData,
      })
    } catch (error) {
      req.body.title = `Failed to retrieve ${type}`
      req.body.errorDescription = 'We were unable to retrieve this report for the following reason:'
      req.body.error = error
      next()
    }
  }

  router.get('/sync/:type/:reportId/:id/', viewSyncReportHandler)
}
