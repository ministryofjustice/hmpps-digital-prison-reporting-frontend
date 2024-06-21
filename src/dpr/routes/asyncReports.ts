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
  // 1 - get filters for the report + make request
  router.get('/async-reports/:reportId/:variantId/request', async (req, res, next) => {
    res.render(`${templatePath}async-request`, {
      title: 'Request Report',
      layoutPath,
      postEndpoint: '/requestReport/',
      ...(await AsyncFiltersUtils.renderFilters({ req, res, dataSources, next })),
    })
  })

  // 2 - handle the post request to request the report data
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
      req.body.error = JSON.parse(error.text)
      next()
    }
  }

  const asyncRequestErrorHandler: RequestHandler = async (req, res, next) => {
    const filters = Object.keys(req.body)
      .filter((attr) => attr.includes('filters.'))
      .filter((attr) => !!req.body[attr])
      .map((attr) => {
        return { name: attr, value: req.body[attr] }
      })
    res.render(`${templatePath}/async-error`, {
      title: 'Request Failed',
      layoutPath,
      ...req.body,
      filters,
    })
  }

  router.post('/requestReport/', asyncRequestHandler, asyncRequestErrorHandler)

  // 3 - polling the status of the request
  router.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res, next) => {
    res.render(`${templatePath}/async-polling`, {
      title: 'Report Requested',
      layoutPath,
      ...(await AsyncPollingUtils.renderPolling({ req, res, dataSources, asyncReportsStore, next })),
    })
  })

  // 3 - load the report data
  router.get('/async-reports/:reportId/:reportVariantId/request/:tableId/report', async (req, res, next) => {
    res.render(`${templatePath}async-report`, {
      layoutPath,
      ...(await AsyncReportListUtils.renderReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        recentlyViewedStoreService,
        next,
      })),
    })
  })
}
