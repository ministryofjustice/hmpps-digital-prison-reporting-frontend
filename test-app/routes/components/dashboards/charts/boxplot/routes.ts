import { Router } from 'express'
import BoxPlotChartController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new BoxPlotChartController()
  router.get('/', controller.GET)
  return router
}
