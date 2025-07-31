/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SyncReportByHandlerController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })

  const controller = new SyncReportByHandlerController()
  router.get('/', controller.GET)

  return router
}
