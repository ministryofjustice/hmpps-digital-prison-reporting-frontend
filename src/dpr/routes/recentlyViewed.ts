import type { RequestHandler, Router } from 'express'
import RecentReportslistUtils from '../components/recently-viewed-list/utils'
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
  const getExpiredStatus: RequestHandler = async (req, res, next) => {
    try {
      const response = await RecentReportslistUtils.getExpiredStatus({ req, res, services })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  const removeViewedItemHandler: RequestHandler = async (req, res, next) => {
    await services.recentlyViewedStoreService.removeReport(req.body.executionId)
    res.end()
  }

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

  router.post('/getExpiredStatus/', getExpiredStatus)
  router.post('/removeViewedItem/', removeViewedItemHandler)
}
