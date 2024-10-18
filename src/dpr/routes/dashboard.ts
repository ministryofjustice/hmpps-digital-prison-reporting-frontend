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
  // Sync Routes

  const getDashboardDataHandler: RequestHandler = async (req, res, next) => {
    const { dashboardData } = req.params
    try {
      res.render(`${templatePath}dashboard`, {
        ...JSON.parse(dashboardData),
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  const dashboardRequestHandler: RequestHandler = async (req, res, next) => {
    const dashboardData = await DashboardUtils.requestDashboardData({ req, res, next, services })
    req.params = {
      ...req.params,
      dashboardData: JSON.stringify(dashboardData),
    }
    next()
  }

  const loadDashboardHandler: RequestHandler = async (req, res, next) => {
    try {
      const dashboardDefinition = await DashboardUtils.getDashboardData({ req, res, next, services })

      res.render(`${templatePath}dashboard-loading`, {
        ...dashboardDefinition,
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  router.get('/dashboards/:dpdId/load/:dashboardId', loadDashboardHandler)
  router.post('/dashboards/:dpdId/dashboard/:dashboardId', dashboardRequestHandler, getDashboardDataHandler)
}
