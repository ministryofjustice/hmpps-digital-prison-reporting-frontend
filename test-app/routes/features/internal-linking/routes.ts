import { Router } from 'express'
import InternalLinkingController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new InternalLinkingController()

  router.get('/', controller.GET)

  return router
}
