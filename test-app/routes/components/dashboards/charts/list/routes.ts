import { Router } from 'express'
import ListChartController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ListChartController()
  router.get('/', controller.GET)
  return router
}
