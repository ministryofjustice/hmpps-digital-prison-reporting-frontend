import type { RequestHandler, Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import AsyncPollingUtils from '../components/async-polling/utils'

import * as AsyncReportUtils from '../utils/renderAsyncReport'

import AsyncReportslistUtils from '../utils/asyncReportsUtils'
import { Services } from '../types/Services'
import logger from '../utils/logger'

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

    if (error && error.message) {
      error = { userMessage: `${error.name}: ${error.message}`, status: 'FAILED', stack: error.stack }
    } else if (error && error.data) {
      error = error.data
    }

    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
      error,
      ...req.params,
    })
  }

  const getReportFiltersHandler: RequestHandler = async (req, res, next) => {
    try {
      const filtersRenderData = await AsyncFiltersUtils.renderFilters({
        req,
        res,
        services,
        next,
      })
      res.render(`${templatePath}async-request`, {
        title: 'Request Report',
        layoutPath,
        postEndpoint: '/requestReport/',
        ...filtersRenderData,
      })
    } catch (error) {
      req.body.title = 'Report Failed'
      req.body.errorDescription = 'Your report has failed to generate. The issue has been reported to admin staff'
      req.body.error = error
      next()
    }
  }

  const asyncRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const redirectToPollingPage = await AsyncFiltersUtils.requestReport({
        req,
        res,
        services,
        next,
      })
      if (redirectToPollingPage) {
        res.redirect(redirectToPollingPage)
      } else {
        res.end()
      }
    } catch (error) {
      req.body = {
        ...req.body,
        ...AsyncFiltersUtils.handleError(error, req),
      }
      next()
    }
  }

  const cancelRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      await AsyncPollingUtils.cancelRequest({
        req,
        res,
        services,
      })
      res.end()
    } catch (error) {
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = error
      next()
    }
  }

  const pollingHandler: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await AsyncPollingUtils.renderPolling({
        req,
        res,
        services,
        next,
      })
      res.render(`${templatePath}/async-polling`, {
        title: 'Report Request Status',
        layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = error
      next()
    }
  }

  const getReportHandler: RequestHandler = async (req, res, next) => {
    try {
      const reportRenderData = await AsyncReportUtils.getReport({
        req,
        res,
        services,
        next,
      })
      res.render(`${templatePath}async-report`, {
        layoutPath,
        ...reportRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report'
      req.body.errorDescription = 'We were unable to retrieve this report for the following reason:'
      req.body.error = error
      next()
    }
  }

  router.get('/async-reports/:reportId/:variantId/request', getReportFiltersHandler, asyncErrorHandler)
  router.post('/requestReport/', asyncRequestHandler, asyncErrorHandler)
  router.post('/cancelRequest/', cancelRequestHandler, asyncErrorHandler)
  router.get('/async-reports/:reportId/:variantId/request/:executionId', pollingHandler, asyncErrorHandler)
  router.get('/async-reports/:reportId/:variantId/request/:tableId/report', getReportHandler, asyncErrorHandler)

  router.get('/async-reports/requested', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await AsyncReportslistUtils.renderAsyncReportsList({
        services,
        res,
      })),
    })
  })
}
