/* eslint-disable no-underscore-dangle */
import type { Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import AsyncReportListUtils from '../components/async-report-list/utils'
import AsyncPollingUtils from '../components/async-polling/utils'
import ReportingClient from '../data/reportingClient'
import AsyncReportStoreService from '../services/requestedReportsService'

export default function routes({
  router,
  asyncReportsStore,
  dataSources,
}: {
  router: Router
  asyncReportsStore: AsyncReportStoreService
  dataSources: ReportingClient
}) {
  // 1 - get filters for the report + make request
  router.get('/async-reports/:reportId/:variantId/request', async (req, res, next) => {
    res.render('async-request.njk', {
      title: 'Request Report',
      postEndpoint: '/requestReport/',
      ...(await AsyncFiltersUtils.renderFilters({ req, res, dataSources, next })),
    })
  })

  // 2 - handle the post request to request the report data
  router.post('/requestReport/', async (req, res, next) => {
    const redirectToPollingPage = await AsyncFiltersUtils.requestReport({
      req,
      res,
      dataSources,
      asyncReportsStore,
      next,
    })
    if (redirectToPollingPage) {
      res.redirect(redirectToPollingPage)
    }
    res.end()
  })

  // 3 - polling the status of the request
  router.get('/async-reports/:reportId/:variantId/request/:executionId', async (req, res, next) => {
    res.render('async-polling.njk', {
      title: 'Report Requested',
      ...(await AsyncPollingUtils.renderPolling({ req, res, dataSources, asyncReportsStore, next })),
    })
  })

  // 3 - load the report data
  router.get('/async-reports/:reportId/:reportVariantId/request/:tableId/report', async (req, res, next) => {
    res.render('async-report.njk', {
      ...(await AsyncReportListUtils.renderReport({
        req,
        res,
        dataSources,
        asyncReportsStore,
        next,
      })),
    })
  })
}
