import type { RequestHandler, Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import AsyncPollingUtils from '../components/async-polling/utils'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import * as AsyncReportUtils from '../utils/renderAsyncReport'

import AsyncReportslistUtils from '../utils/asyncReportsUtils'
import BookmarkService from '../services/bookmarkService'

export default function routes({
  router,
  asyncReportsStore,
  recentlyViewedStoreService,
  bookmarkService,
  dataSources,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  asyncReportsStore: AsyncReportStoreService
  recentlyViewedStoreService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  dataSources: ReportingService
  layoutPath: string
  templatePath?: string
}) {
  const asyncErrorHandler: RequestHandler = async (req, res) => {
    res.render(`${templatePath}/async-error`, {
      layoutPath,
      ...req.body,
      ...req.params,
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
      req.body.errorDescription = 'Your report has failed to generate. The issue has been reported to admin staff'
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

  const cancelRequestHandler: RequestHandler = async (req, res, next) => {
    try {
      await AsyncPollingUtils.cancelRequest({
        req,
        res,
        dataSources,
        asyncReportsStore,
      })
      res.end()
    } catch (error) {
      req.body.title = 'Failed to abort request'
      req.body.errorDescription = 'We were unable to abort the report request for the following reason:'
      req.body.error = error.data
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
        title: 'Report Request Status',
        layoutPath,
        ...pollingRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report status'
      req.body.errorDescription = 'We were unable to retrieve the report status:'
      req.body.error = error.data
      next()
    }
  }

  const getReportHandler: RequestHandler = async (req, res, next) => {
    try {
      const reportRenderData = await AsyncReportUtils.getReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        bookmarkService,
        recentlyViewedStoreService,
        next,
      })
      res.render(`${templatePath}async-report`, {
        layoutPath,
        ...reportRenderData,
      })
    } catch (error) {
      req.body.title = 'Failed to retrieve Report'
      req.body.errorDescription = 'We were unable to retrieve this report for the following reason:'
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
        recentlyViewedStoreService,
        asyncReportsStore,
        dataSources,
        res,
      })),
    })
  })
}
