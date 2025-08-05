import { Router } from 'express'
import LineChartController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new LineChartController()
  router.get('/', controller.GET)
  return router
}
