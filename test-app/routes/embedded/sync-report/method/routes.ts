/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SyncReportByMethodController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new SyncReportByMethodController()
  router.get('/', controller.GET)
  return router
}
