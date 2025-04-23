import type { RequestHandler, Router } from 'express'
import RecentReportslistUtils from '../components/user-reports/viewed/utils'
import UserReportsListUtils from '../components/user-reports/utils'
import LocalsHelper from '../utils/localsHelper'
import { Services } from '../types/Services'
import logger from '../utils/logger'

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
  logger.info('Initialiasing routes: Recently Viewed')

  const getExpiredStatus: RequestHandler = async (req, res, next) => {
    try {
      const response = await UserReportsListUtils.getExpiredStatus({
        req,
        res,
        services,
        storeService: services.recentlyViewedService,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }

  const removeViewedItemHandler: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    await services.recentlyViewedService.removeReport(req.body.executionId, userId)
    res.end()
  }

  router.get('/async-reports/recently-viewed', async (req, res) => {
    const { recentlyViewedReports } = LocalsHelper.getValues(res)
    res.render(`${templatePath}/async-reports`, {
      title: 'Requested Reports',
      layoutPath,
      ...(await UserReportsListUtils.renderList({
        reportsData: recentlyViewedReports,
        filterFunction: RecentReportslistUtils.filterReports,
        res,
        type: 'requested',
      })),
    })
  })

  router.post('/getExpiredStatus/', getExpiredStatus)
  router.post('/removeViewedItem/', removeViewedItemHandler)
}
