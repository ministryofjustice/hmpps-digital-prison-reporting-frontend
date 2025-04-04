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
    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
      ...req.params,
      error: req.body.error,
      params: req.params,
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
      req.body.error = ErrorSummaryUtils.handleError(error)
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
      next(error)
    }
  }

  const isAuthorisedToViewReport: RequestHandler = async (req, res, next) => {
    const { token } = LocalsHelper.getValues(res)
    const { reportId, id, variantId, type } = req.params
    const { dataProductDefinitionsPath } = req.query

    let definition
    if (type === ReportType.REPORT) {
      definition = await services.reportingService.getDefinition(
        token,
        reportId,
        variantId || id,
        dataProductDefinitionsPath,
      )
    }

    req.body.definition = definition
    if (definition?.authorised !== undefined && !definition.authorised) {
      await unauthorisedReportHandler(req, res, next)
    } else {
      next()
    }
  }

  const unauthorisedReportHandler: RequestHandler = async (req, res) => {
    res.render(`${templatePath}/unauthorised-report`, {
      layoutPath,
      ...req.body,
    })
  }

  const viewReportPaths = ['/sync/:type/:reportId/:id/report', '/sync/:type/:reportId/:id/report/:download']
  router.get(viewReportPaths, isAuthorisedToViewReport, viewSyncReportHandler, errorHandler)
  router.get('/sync/:type/:reportId/:id/load-report', isAuthorisedToViewReport, syncReportLoadingHandler)
}
