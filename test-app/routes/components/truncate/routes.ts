/* eslint-disable no-param-reassign */
import { Router } from 'express'
import TruncateController from './controller'

export default function routes(): Router {
  const router = Router({ mergeParams: true })

  const controller = new TruncateController()

  router.get('/', controller.GET)

  return router
}
