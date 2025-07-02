/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler, Router } from 'express'

// Types
import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'
import { RequestDataResult } from '../types/AsyncReportUtils'

import AsyncRequestListUtils from '../components/user-reports/requested/utils'
import ErrorSummaryUtils from '../components/error-summary/utils'
import LocalsHelper from '../utils/localsHelper'
import logger from '../utils/logger'

// New utils paths
import AsyncPollingUtils from './journeys/request-report/status/utils'
import AysncRequestUtils from './journeys/request-report/filters/utils'
import DashboardUtils from './journeys/view-report/async/dashboard/utils'
import AsyncReportUtils from './journeys/view-report/async/report/utils'

// New async views paths
const filtersViewPath = 'dpr/routes/journeys/request-report/filters/view'
const statusViewPath = 'dpr/routes/journeys/request-report/status/view'
const reportViewPath = 'dpr/routes/journeys/view-report'
const errorPath = 'dpr/routes/journeys/view-report/error'
const unauthorisedPath = 'dpr/routes/journeys/view-report/unauthorised'

export default function routes({
  router,
  services,
  layoutPath,
  prefix,
}: {
  router: Router
  services: Services
  layoutPath: string
  prefix: string
}) {
  logger.info('Initialiasing routes: Async reports')

  /**   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
   *                                                            *
   *                    ERROR & AUTH ROUTES                     *
   *                                                            *
   **   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

  /**
   * Error Handler
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const asyncErrorHandler: RequestHandler = async (req, res) => {
    logger.error(`Error: ${JSON.stringify(req.body)}`)
    res.render(errorPath, {
      layoutPath,
      ...req.body,
      ...req.params,
      error: req.body.error,
      params: req.params,
    })
  }

  /**
   * Authorisation middleware handler
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const isAuthorisedToViewReport: RequestHandler = async (req, res, next) => {
    const definition = await AysncRequestUtils.getDefintionByType(req, res, next, services)
    req.body = {
      ...(req.body && { body: req.body }),
      definition,
    }
    if (definition?.authorised !== undefined && !definition.authorised) {
      await unauthorisedReportHandler(req, res, next)
    } else {
      next()
    }
  }

  /**
   * Unauthorised route handler
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const unauthorisedReportHandler: RequestHandler = async (req, res) => {
    res.render(unauthorisedPath, {
      layoutPath,
      ...req.body,
    })
  }

  /**   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
   *                                                            *
   *                  STAGE 1: REQUEST ROUTES                   *
   *                                                            *
   **   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

  /**
   * REQUEST: Render request handler -
   * NOTE: MOVED
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const renderRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const requestRenderData = <RequestDataResult>await AysncRequestUtils.renderRequest({
        req,
        res,
        services,
        next,
      })

      res.render(filtersViewPath, {
        layoutPath,
        postEndpoint: '/dpr/requestReport/',
        ...requestRenderData,
      })
    } catch (error) {
      req.body.title = 'Request failed'
      req.body.errorDescription = `Your ${req.params.type} has failed to generate.`
      req.body.error = ErrorSummaryUtils.handleError(error, req.params.type)
      next()
    }
  }

  /**
   * REQUEST: Make request
   * NOTE: MOVED
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const asyncRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const redirectToPollingPage = await AysncRequestUtils.request({
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
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      const filters = AysncRequestUtils.getFiltersFromReqBody(req)

      req.body = {
        title: 'Request Failed',
        errorDescription: `Your ${req.params.type} has failed to generate.`,
        error: dprError,
        retry: true,
        filters,
        ...req.body,
      }
      next()
    }
  }

  /**
   * REQUEST: Cancel request
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const cancelRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      await AysncRequestUtils.cancelRequest({
        req,
        res,
        services,
      })
      res.end()
    } catch (error) {
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = ErrorSummaryUtils.handleError(error)
      next()
    }
  }

  /**   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
   *                                                            *
   *                  STAGE 2: POLLING ROUTES                   *
   *                                                            *
   **   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

  /**
   * POLLING: Render Polling
   * NOTE: MOVED
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const pollingHandler: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await AsyncPollingUtils.renderPolling({
        req,
        res,
        services,
        next,
      })
      res.render(statusViewPath, {
        layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = ErrorSummaryUtils.handleError(error)
      next()
    }
  }

  /**
   * POLLING: Get Status
   * NOTE: MOVED
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const getStatusHandler: RequestHandler = async (req, res, next) => {
    try {
      const response = await AsyncRequestListUtils.getRequestStatus({ req, res, services })
      res.send({ status: response.status })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  /**   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
   *                                                            *
   *                  STAGE 3: VIEW REPORT ROUTES               *
   *                                                            *
   **   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

  /**
   * VIEW REPORT: Render report
   * NOTE: MOVED
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const viewReportHandler: RequestHandler = async (req, res, next) => {
    const { type } = req.params
    try {
      let template
      let renderData
      const params = { req, res, services, next }

      if (type === ReportType.REPORT) {
        template = 'report'
        renderData = await AsyncReportUtils.renderReport(params)
      }

      if (type === ReportType.DASHBOARD) {
        template = 'dashboard'
        renderData = await DashboardUtils.renderAsyncDashboard(params)
      }

      res.render(`${reportViewPath}/${template}`, {
        layoutPath,
        ...renderData,
      })
    } catch (error) {
      const dprError = ErrorSummaryUtils.handleError(error, req.params.type)
      let refreshLink
      if (dprError.status === 'EXPIRED') {
        const { userId } = LocalsHelper.getValues(res)
        refreshLink = await services.recentlyViewedService.asyncSetToExpiredByTableId(req.params.tableId, userId)
      }
      req.body.title = `Failed to retrieve ${type}`
      req.body.error = dprError
      req.body.refreshLink = refreshLink
      next()
    }
  }

  // 1 - REQUEST
  router.get(
    `${prefix}/async/:type/:reportId/:id/request`,
    isAuthorisedToViewReport,
    renderRequestHandler,
    asyncErrorHandler,
  )
  router.post('/dpr/requestReport/', asyncRequestHandler, asyncErrorHandler)

  // 2 - POLLING
  router.get(`${prefix}/async/:type/:reportId/:id/request/:executionId`, pollingHandler, asyncErrorHandler)
  router.post('/dpr/getStatus/', getStatusHandler)
  router.post('/dpr/cancelRequest/', cancelRequestHandler, asyncErrorHandler)

  // 3 - VIEw REPORT
  const viewReportPaths = [
    `${prefix}/async/:type/:reportId/:id/request/:tableId/report`,
    `${prefix}/async/:type/:reportId/:id/request/:tableId/report/:download`,
  ]
  router.get(viewReportPaths, isAuthorisedToViewReport, viewReportHandler, asyncErrorHandler)
}
