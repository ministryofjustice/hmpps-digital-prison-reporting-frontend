import { Router } from 'express'
import BarChartController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new BarChartController()
  router.get('/', controller.GET)
  return router
}
