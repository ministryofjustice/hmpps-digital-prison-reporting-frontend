import type { RequestHandler, Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import AsyncPollingUtils from '../components/async-polling/utils'
import AsyncRequestListUtils from '../components/user-reports-request-list/utils'
import UserReportsListUtils from '../components/user-reports/utils'
import ErrorSummaryUtils from '../components/error-summary/utils'
import AysncRequestUtils from '../utils/RequestReportUtils'

import * as AsyncReportUtils from '../utils/renderAsyncReport'

import { Services } from '../types/Services'
import logger from '../utils/logger'
import { RenderFiltersReturnValue } from '../components/async-filters/types'
import { RequestDataResult } from '../types/AsyncReportUtils'

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

  const renderRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const requestRenderData = <RequestDataResult>await AysncRequestUtils.renderRequestData({
        req,
        res,
        services,
        next,
      })

      let filtersRenderData = {}
      if (requestRenderData.fields) {
        filtersRenderData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(requestRenderData.fields)
      }

      res.render(`${templatePath}async-request`, {
        title: `Request ${requestRenderData.reportData.type}`,
        filtersDescription: `Customise your ${requestRenderData.reportData.type} using the filters below and submit your request.`,
        layoutPath,
        postEndpoint: '/requestReport/',
        reportData: {
          ...requestRenderData.reportData,
        },
        ...filtersRenderData,
      })
    } catch (error) {
      req.body.title = 'Report failed'
      req.body.errorDescription = 'Your report has failed to generate'
      req.body.error = error
      next()
    }
  }

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
      req.body = {
        ...req.body,
        ...AysncRequestUtils.handleError(error, req),
      }
      next()
    }
  }

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
      req.body.error = error
      next()
    }
  }

  const removeRequestedItemHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    try {
      await services.requestedReportService.removeReport(req.body.executionId, userId)
      res.end()
    } catch (error) {
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = error
      next()
    }
  }

  const getStatusHandler: RequestHandler = async (req, res, next) => {
    try {
      const response = await AsyncRequestListUtils.getRequestStatus({ req, res, services })
      res.send({ status: response.status })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

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

  const pollingHandler: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await AsyncPollingUtils.renderPolling({
        req,
        res,
        services,
        next,
      })
      res.render(`${templatePath}/async-polling`, {
        title: 'Report request status',
        layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve report status'
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
      req.body.title = 'Failed to retrieve report'
      req.body.errorDescription = 'We were unable to retrieve this report for the following reason:'
      req.body.error = error
      next()
    }
  }

  const listingHandler: RequestHandler = async (req, res, next) => {
    res.render(`${templatePath}/async-reports`, {
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
   * - New types have been added to the async route. The second route is a generic route that will accept any type.
   * - Going forward, all requests will be made to the this second route
   * - HOWEVER, because we store reports in Redis, including the request path, we must keep the initial route in place
   * - As requests expire after 24hrs, eventually the old route will dissapear from the store and only include the second route.
   * - At this point we can consider removing this route all together
   */

  // 1 - REQUEST
  router.get('/async-reports/:reportId/:variantId/request', async (req, res, next) => {
    const { reportId, variantId: id } = req.params
    res.redirect(`/async/report/${reportId}/${id}/request`)
  })

  router.get('/async/:type/:reportId/:id/request', renderRequestHandler, asyncErrorHandler)
  router.post('/requestReport/', asyncRequestHandler, asyncErrorHandler)

  // 2 - POLLING
  router.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res, next) => {
    const { reportId, variantId: id, executionId } = req.params
    res.redirect(`/async/report/${reportId}/${id}/request/${executionId}`)
  })

  router.get('/async/:type/:reportId/:id/request/:executionId', pollingHandler, asyncErrorHandler)
  router.post('/getStatus/', getStatusHandler)
  router.post('/cancelRequest/', cancelRequestHandler, asyncErrorHandler)

  // 3 - REPORT
  router.get('/async-reports/:reportId/:variantId/request/:tableId/report', async (req, res, next) => {
    const { reportId, variantId: id, tableId } = req.params
    res.redirect(`/async/report/${reportId}/${id}/request/${tableId}/report`)
  })

  router.get('/async/:type/:reportId/:id/request/:tableId/report', getReportHandler, asyncErrorHandler)

  // Homepage widget routes
  router.post('/removeRequestedItem/', removeRequestedItemHandler, asyncErrorHandler)
  router.post('/getRequestedExpiredStatus/', getExpiredStatus)
  router.get('/async-reports/requested', listingHandler)
}
