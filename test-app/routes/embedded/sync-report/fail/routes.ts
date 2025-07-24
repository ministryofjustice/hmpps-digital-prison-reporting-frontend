/* eslint-disable no-param-reassign */
import { Router } from 'express'
import SyncReportFailController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new SyncReportFailController()
  router.get('/', controller.GET)
  return router
}
