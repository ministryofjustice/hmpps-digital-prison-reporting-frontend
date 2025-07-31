/* eslint-disable no-param-reassign */
import { Router } from 'express'
import MultiSelectController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new MultiSelectController()
  router.get('/', controller.GET)
  return router
}
