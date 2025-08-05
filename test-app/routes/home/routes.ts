/* eslint-disable no-param-reassign */
import { Router } from 'express'
import HomepageController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })

  const controller = new HomepageController()
  router.get('/', controller.GET)

  return router
}
