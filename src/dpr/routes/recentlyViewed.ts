import type { Router } from 'express'
import RecentReportslistUtils from '../utils/recentlyViewedUtils'
import { Services } from '../types/Services'

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
  router.get('/async-reports/recently-viewed', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await RecentReportslistUtils.renderRecentlyViewedList({
        services,
        res,
      })),
    })
  })
}
