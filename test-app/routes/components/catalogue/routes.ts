/* eslint-disable no-param-reassign */
import { Router } from 'express'
import DateController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new DateController()
  router.get('/', controller.GET)
  return router
}
