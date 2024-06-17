import type { Router } from 'express'
import AsyncFiltersUtils from '../components/async-filters/utils'
import AsyncReportListUtils from '../components/async-report-list/utils'
import AsyncPollingUtils from '../components/async-polling/utils'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'

export default function routes({
  router,
  asyncReportsStore,
  dataSources,
  layoutPath,
  templatePath = '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/views/',
}: {
  router: Router
  asyncReportsStore: AsyncReportStoreService
  dataSources: ReportingService
  layoutPath: string
  templatePath: string
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
    } else {
      res.end()
    }
  })

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
        next,
      })),
    })
  })
}
