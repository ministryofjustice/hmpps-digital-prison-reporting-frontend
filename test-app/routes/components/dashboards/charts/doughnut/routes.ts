import { Router } from 'express'
import DoughnutChartController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new DoughnutChartController()
  router.get('/', controller.GET)
  return router
}
