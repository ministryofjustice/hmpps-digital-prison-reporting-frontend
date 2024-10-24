import type { RequestHandler, Router } from 'express'
import RecentReportslistUtils from '../components/user-reports-viewed-list/utils'
import UserReportsListUtils from '../components/user-reports/utils'
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
      const response = await UserReportsListUtils.getExpiredStatus({
        req,
        res,
        services,
        storeService: services.recentlyViewedStoreService,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  const removeViewedItemHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    await services.recentlyViewedStoreService.removeReport(req.body.executionId, userId)
    res.end()
  }

  router.get('/async-reports/recently-viewed', async (req, res) => {
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await UserReportsListUtils.renderList({
        storeService: services.recentlyViewedStoreService,
        filterFunction: RecentReportslistUtils.filterReports,
        res,
        type: 'requested',
      })),
    })
  })

  router.post('/getExpiredStatus/', getExpiredStatus)
  router.post('/removeViewedItem/', removeViewedItemHandler)
}
