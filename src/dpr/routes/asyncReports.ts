import type { RequestHandler, Router, Request } from 'express'
import AsyncPollingUtils from '../components/_async/async-polling/utils'
import AsyncRequestListUtils from '../components/user-reports/requested/utils'
import UserReportsListUtils from '../components/user-reports/utils'
import ErrorSummaryUtils from '../components/error-summary/utils'
import AysncRequestUtils from '../components/_async/async-request/utils'
import DashboardUtils from '../components/_dashboards/dashboard/utils'
import LocalsHelper from '../utils/localsHelper'
import AsyncReportUtils from '../components/_async/async-report/utils'
import logger from '../utils/logger'

// Types
import { Services } from '../types/Services'
import { ReportType } from '../types/UserReports'
import { RequestDataResult } from '../types/AsyncReportUtils'

export default function routes({
  router,
  services,
  layoutPath,
}: {
  router: Router
  services: Services
  layoutPath: string
}) {
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
    res.render(`dpr/views/async-error`, {
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
    req.body.definition = definition
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
    res.render(`dpr/views/unauthorised-report`, {
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
   * REQUEST: Render request handler
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

      res.render(`dpr/views/async-request`, {
        layoutPath,
        postEndpoint: '/requestReport/',
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
   *
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

  /**
   * REQUEST: Remove request
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const removeRequestedItemHandler: RequestHandler = async (req, res, next) => {
    const { userId } = LocalsHelper.getValues(res)
    try {
      await services.requestedReportService.removeReport(req.body.executionId, userId)
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
      res.render(`dpr/views/async-polling`, {
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

  /**
   * POLLING: Get Expired Status
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  const getExpiredStatus: RequestHandler = async (req, res, next) => {
    try {
      const response = await UserReportsListUtils.getExpiredStatus({
        req,
        res,
        services,
        storeService: services.requestedReportService,
      })
      res.send({ isExpired: response })
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
        template = 'async-report'
        renderData = await AsyncReportUtils.renderReport(params)
      }

      if (type === ReportType.DASHBOARD) {
        template = 'dashboard'
        renderData = await DashboardUtils.renderAsyncDashboard(params)
      }

      res.render(`dpr/views/${template}`, {
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

  const listingHandler: RequestHandler = async (req, res, next) => {
    res.render(`dpr/views/async-reports`, {
      title: 'Requested reports',
      layoutPath,
      ...(await UserReportsListUtils.renderList({
        storeService: services.requestedReportService,
        filterFunction: AsyncRequestListUtils.filterReports,
        res,
        type: 'requested',
      })),
    })
  }

  /**
   * NOTE:
   * - The async route paths have been made more generic with the introduction of `type`, to allow other report types (e.g dashboard) to follow the async path
   * - All requests will be made to the this new route.
   *
   * - Previously stored requested and viewed reports in Redis will have the old route path. Which is redirected to the new path.
   * - As requests expire after 24hrs, eventually the old route will dissapear from the requested and viewed store and only include the new route.
   * - At this point we can consider removing this route all together
   */

  // 1 - REQUEST
  router.get('/async/:type/:reportId/:id/request', isAuthorisedToViewReport, renderRequestHandler, asyncErrorHandler)
  router.post('/requestReport/', asyncRequestHandler, asyncErrorHandler)

  // 2 - POLLING
  router.get('/async/:type/:reportId/:id/request/:executionId', pollingHandler, asyncErrorHandler)
  router.post('/getStatus/', getStatusHandler)
  router.post('/cancelRequest/', cancelRequestHandler, asyncErrorHandler)

  // 3 - VIEw REPORT
  const viewReportPaths = [
    '/async/:type/:reportId/:id/request/:tableId/report',
    '/async/:type/:reportId/:id/request/:tableId/report/:download',
  ]
  router.get(viewReportPaths, isAuthorisedToViewReport, viewReportHandler, asyncErrorHandler)

  // Homepage widget routes
  router.post('/removeRequestedItem/', removeRequestedItemHandler, asyncErrorHandler)
  router.post('/getRequestedExpiredStatus/', getExpiredStatus)
  router.get('/async-reports/requested', listingHandler)

  // REDIRECTS

  const setQueryParams = (req: Request, url: string) => {
    const queryString = new URLSearchParams(req.query as unknown as URLSearchParams).toString()
    if (queryString.length) {
      return `${url}?${queryString}`
    }
    return url
  }

  // Request
  router.get('/async-reports/:reportId/:variantId/request', async (req, res, next) => {
    const { reportId, variantId: id } = req.params
    let url = `/async/report/${reportId}/${id}/request`
    url = setQueryParams(req, url)
    res.redirect(url)
  })

  // POLLING
  router.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res, next) => {
    const { reportId, variantId: id, executionId } = req.params
    let url = `/async/report/${reportId}/${id}/request/${executionId}`
    url = setQueryParams(req, url)
    res.redirect(url)
  })

  // REPORT
  router.get('/async-reports/:reportId/:variantId/request/:tableId/report', async (req, res, next) => {
    const { reportId, variantId: id, tableId } = req.params
    let url = `/async/report/${reportId}/${id}/request/${tableId}/report`
    url = setQueryParams(req, url)
    res.redirect(url)
  })
}
