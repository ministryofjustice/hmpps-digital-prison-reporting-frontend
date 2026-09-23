import { Router } from 'express'
import MatrixChartController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new MatrixChartController()
  router.get('/', controller.GET)
  return router
}
