import { Router } from 'express'
import ChartsController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ChartsController()
  router.get('/', controller.GET)
  return router
}
