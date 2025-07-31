import { Router } from 'express'
import DashboardListController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new DashboardListController()
  router.get('/', controller.GET)
  return router
}
