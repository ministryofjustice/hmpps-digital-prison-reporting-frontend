import type { RequestHandler, Router, Request } from 'express'
import AsyncFiltersUtils from '../components/_async/async-filters-form/utils'
import AsyncPollingUtils from '../components/_async/async-polling/utils'
import AsyncRequestListUtils from '../components/user-reports/requested/utils'
import UserReportsListUtils from '../components/user-reports/utils'
import ErrorSummaryUtils from '../components/error-summary/utils'
import AysncRequestUtils from '../utils/RequestReportUtils'
import DashboardUtils from '../components/_dashboards/dashboard/utils'

import LocalsHelper from '../utils/localsHelper'

import AsyncReportUtils from '../components/_async/async-report/utils'

import { Services } from '../types/Services'
import logger from '../utils/logger'
import { RenderFiltersReturnValue } from '../components/_async/async-filters-form/types'
import { RequestDataResult } from '../types/AsyncReportUtils'
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

  const unauthorisedReportHandler: RequestHandler = async (req, res) => {
    res.render(`${templatePath}/unauthorised-report`, {
      layoutPath,
      ...req.body,
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

      const { fields, interactive } = requestRenderData
      let filtersRenderData = {}
      if (requestRenderData.fields) {
        filtersRenderData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(fields, interactive)
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

  const viewReportHandler: RequestHandler = async (req, res, next) => {
    const { type } = req.params
    try {
      let template
      let renderData
      const params = { req, res, services, next }

      if (type === ReportType.REPORT) {
        template = 'async-report'
        renderData = await AsyncReportUtils.getReport(params)
      }

      if (type === ReportType.DASHBOARD) {
        template = 'dashboard'
        renderData = await DashboardUtils.renderAsyncDashboard(params)
      }

      res.render(`${templatePath}${template}`, {
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

  const setQueryParams = (req: Request, url: string) => {
    const queryString = new URLSearchParams(req.query as unknown as URLSearchParams).toString()
    if (queryString.length) {
      return `${url}?${queryString}`
    }
    return url
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

    if (type === ReportType.DASHBOARD) {
      definition = await services.dashboardService.getDefinition(
        token,
        reportId,
        variantId || id,
        dataProductDefinitionsPath,
      )
    }

    req.body.definition = definition
    if (definition.authorised !== undefined && !definition.authorised) {
      await unauthorisedReportHandler(req, res, next)
    } else {
      next()
    }
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
