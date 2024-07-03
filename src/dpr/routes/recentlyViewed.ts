import type { Router } from 'express'
import RecentReportslistUtils from '../utils/recentlyViewedUtils'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import AsyncReportStoreService from '../services/requestedReportsService'
import ReportingService from '../services/reportingService'

export default function routes({
  router,
  asyncReportsStore,
  recentlyViewedStoreService,
  dataSources,
  layoutPath,
  templatePath = 'dpr/views/',
}: {
  router: Router
  recentlyViewedStoreService: RecentlyViewedStoreService
  asyncReportsStore: AsyncReportStoreService
  dataSources: ReportingService
  layoutPath: string
  templatePath?: string
}) {
  router.get('/async-reports/recently-viewed', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await RecentReportslistUtils.renderRecentlyViewedList({
        recentlyViewedStoreService,
        asyncReportsStore,
        dataSources,
        res,
      })),
    })
  })
}
