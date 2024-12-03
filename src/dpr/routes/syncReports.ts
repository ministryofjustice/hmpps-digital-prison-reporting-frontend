/* eslint-disable no-param-reassign */
import type { RequestHandler, Router } from 'express'
import ErrorSummaryUtils from '../components/error-summary/utils'
import logger from '../utils/logger'
import LocalsHelper from '../utils/localsHelper'

import SyncReportUtils from '../components/_sync/sync-report/utils'

import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'

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
      const renderData = await SyncReportUtils.getReport({ req, res, services })

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

  const syncReportLoadingHandler: RequestHandler = async (req, res, next) => {
    try {
      const { token } = LocalsHelper.getValues(res)
      const { reportId, id } = req.params
      const { dataProductDefinitionsPath } = req.query

      const definition = await services.reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

      const { name: reportName, variant, description: reportDescription } = definition
      const { classification, description, name } = variant

      res.render(`${templatePath}sync-load`, {
        renderData: {
          reportId,
          id,
          type: ReportType.REPORT,
          reportName,
          name,
          classification,
          description: description || reportDescription,
        },
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  // Direct route
  const viewReportPaths = ['/sync/:type/:reportId/:id/report', '/sync/:type/:reportId/:id/report/:download']
  router.get(viewReportPaths, viewSyncReportHandler, errorHandler)
  router.get('/sync/:type/:reportId/:id/load-report', syncReportLoadingHandler)
}
