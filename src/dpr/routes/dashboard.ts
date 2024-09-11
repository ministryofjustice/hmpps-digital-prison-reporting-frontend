import type { RequestHandler, Router } from 'express'
import DashboardUtils from '../utils/dashboardUtils'
import { Services } from '../types/Services'

export default function routes({
  router,
  layoutPath,
  services,
  templatePath = 'dpr/views/',
}: {
  router: Router
  layoutPath: string
  services: Services
  templatePath?: string
}) {
  const getDashboardDataHandler: RequestHandler = async (req, res, next) => {
    try {
      const dashboardData = await DashboardUtils.getDashboardData({ req, res, next, services })

      res.render(`${templatePath}dashboard`, {
        ...dashboardData,
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  router.get('/dashboard/:dpdId/:dashboardId', getDashboardDataHandler)
}
