/* eslint-disable no-param-reassign */
import { Router } from 'express'
import DateRangeController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new DateRangeController()
  router.get('/', controller.GET)
  return router
}
