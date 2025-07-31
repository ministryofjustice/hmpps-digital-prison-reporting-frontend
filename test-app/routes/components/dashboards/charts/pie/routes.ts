import { Router } from 'express'
import PieChartController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new PieChartController()
  router.get('/', controller.GET)
  return router
}
