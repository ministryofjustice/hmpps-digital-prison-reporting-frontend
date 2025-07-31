import { Router } from 'express'
import ScorecardsController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ScorecardsController()
  router.get('/', controller.GET)
  return router
}
