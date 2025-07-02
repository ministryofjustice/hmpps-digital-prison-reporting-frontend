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
   * REQUEST: Make request
   * NOTE: MOVED
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const asyncRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const { reportId, id, type } = req.body
      const executionId = await AysncRequestUtils.request({
        req,
        res,
        services,
        next,
      })

      if (executionId) {
        res.redirect(`/async/${type}/${reportId}/${id}/request/${executionId}`)
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
   *                  STAGE 3: VIEW REPORT ROUTES               *
   *                                                            *
   **   *   *   *   *   *   *   *   *   *   *   *   *   *   *   */

  // 2 - POLLING
  router.post('/dpr/cancelRequest/', cancelRequestHandler, asyncErrorHandler)
}
