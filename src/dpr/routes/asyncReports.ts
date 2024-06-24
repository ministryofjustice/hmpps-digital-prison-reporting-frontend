import type { RequestHandler, Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import * as AsyncReportListUtils from '../components/async-report-list/utils'
import AsyncPollingUtils from '../components/async-polling/utils'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'
import RecentlyViewedStoreService from '../services/recentlyViewedService'

export default function routes({
  router,
  asyncReportsStore,
  recentlyViewedStoreService,
  dataSources,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  asyncReportsStore: AsyncReportStoreService
  recentlyViewedStoreService: RecentlyViewedStoreService
  dataSources: ReportingService
  layoutPath: string
  templatePath?: string
}) {
  const asyncErrorHandler: RequestHandler = async (req, res) => {
    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
    })
  }

  const getReportFiltersHandler: RequestHandler = async (req, res, next) => {
    try {
      const filtersRenderData = await AsyncFiltersUtils.renderFilters({ req, res, dataSources, next })
      res.render(`${templatePath}async-request`, {
        title: 'Request Report',
        layoutPath,
        postEndpoint: '/requestReport/',
        ...filtersRenderData,
      })
    } catch (error) {
      req.body.title = 'Report Failed'
      req.body.description = 'Your report has failed to generate. The issue has been reported to admin staff'
      req.body.error = error.data
      next()
    }
  }

  const asyncRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      const redirectToPollingPage = await AsyncFiltersUtils.requestReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        recentlyViewedStoreService,
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

  const pollingHandler: RequestHandler = async (req, res, next) => {
    try {
      const pollingRenderData = await AsyncPollingUtils.renderPolling({
        req,
        res,
        dataSources,
        asyncReportsStore,
        next,
      })
      res.render(`${templatePath}/async-polling`, {
        title: 'Report Requested',
        layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report status'
      req.body.description = 'We were unable to retrieve the report status:'
      req.body.error = error.data
      next()
    }
  }

  const getReportListHandler: RequestHandler = async (req, res, next) => {
    try {
      const reportRenderData = await AsyncReportListUtils.renderReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        recentlyViewedStoreService,
        next,
      })
      res.render(`${templatePath}async-report`, {
        layoutPath,
        ...reportRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report'
      req.body.description = 'We were unable to retrieve this report for the following reason:'
      next()
    }
  }

  router.get('/async-reports/:reportId/:variantId/request', getReportFiltersHandler, asyncErrorHandler)
  router.post('/requestReport/', asyncRequestHandler, asyncErrorHandler)
  router.get('/async-reports/:reportId/:variantId/request/:executionId', pollingHandler, asyncErrorHandler)
  router.get(
    '/async-reports/:reportId/:reportVariantId/request/:tableId/report',
    getReportListHandler,
    asyncErrorHandler,
  )
}
